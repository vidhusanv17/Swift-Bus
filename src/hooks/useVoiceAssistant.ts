import { useState, useEffect, useCallback } from 'react';

interface VoiceAssistantState {
  isSupported: boolean;
  hasPermissions: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
}

interface VoiceAssistantHook extends VoiceAssistantState {
  requestPermissions: () => Promise<boolean>;
  speak: (text: string, options?: SpeechSynthesisUtteranceOptions) => Promise<void>;
  startListening: () => Promise<void>;
  stopListening: () => void;
  playBusNotification: () => Promise<void>;
}

interface SpeechSynthesisUtteranceOptions {
  voice?: SpeechSynthesisVoice;
  volume?: number;
  rate?: number;
  pitch?: number;
  lang?: string;
}

export const useVoiceAssistant = (): VoiceAssistantHook => {
  const [state, setState] = useState<VoiceAssistantState>({
    isSupported: false,
    hasPermissions: false,
    isListening: false,
    isSpeaking: false,
    error: null,
  });

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Check browser support
  useEffect(() => {
    const speechSupported = 'speechSynthesis' in window;
    const recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    setState(prev => ({
      ...prev,
      isSupported: speechSupported && recognitionSupported,
    }));

    if (recognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setState(prev => ({ ...prev, isListening: true, error: null }));
      };

      recognitionInstance.onend = () => {
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognitionInstance.onerror = (event) => {
        setState(prev => ({ 
          ...prev, 
          isListening: false, 
          error: `Speech recognition error: ${event.error}` 
        }));
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, error: null }));

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());

      // Test speech synthesis (no explicit permission needed, but test if it works)
      if ('speechSynthesis' in window) {
        // Wait for voices to load
        return new Promise((resolve) => {
          const checkVoices = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
              setState(prev => ({ ...prev, hasPermissions: true }));
              resolve(true);
            } else {
              setTimeout(checkVoices, 100);
            }
          };
          
          if (speechSynthesis.getVoices().length > 0) {
            setState(prev => ({ ...prev, hasPermissions: true }));
            resolve(true);
          } else {
            speechSynthesis.onvoiceschanged = checkVoices;
            setTimeout(() => {
              setState(prev => ({ ...prev, hasPermissions: true }));
              resolve(true);
            }, 1000);
          }
        });
      }

      setState(prev => ({ ...prev, hasPermissions: true }));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Permission denied';
      setState(prev => ({ 
        ...prev, 
        hasPermissions: false, 
        error: `Microphone permission denied: ${errorMessage}` 
      }));
      return false;
    }
  }, []);

  const speak = useCallback(async (text: string, options: SpeechSynthesisUtteranceOptions = {}): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set options
      utterance.volume = options.volume ?? 0.8;
      utterance.rate = options.rate ?? 0.9;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.lang = options.lang ?? 'en-US';

      // Try to use a natural voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Natural'))
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setState(prev => ({ ...prev, isSpeaking: true, error: null }));
      };

      utterance.onend = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        resolve();
      };

      utterance.onerror = (event) => {
        setState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          error: `Speech synthesis error: ${event.error}` 
        }));
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      speechSynthesis.speak(utterance);
    });
  }, []);

  const startListening = useCallback(async (): Promise<void> => {
    if (!recognition) {
      throw new Error('Speech recognition not supported');
    }

    if (!state.hasPermissions) {
      throw new Error('Microphone permission not granted');
    }

    try {
      recognition.start();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: `Failed to start listening: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
      throw error;
    }
  }, [recognition, state.hasPermissions]);

  const stopListening = useCallback((): void => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const playBusNotification = useCallback(async (): Promise<void> => {
    const notificationText = "This bus is coming to your bus stand, kindly be ready.";
    
    try {
      await speak(notificationText, {
        volume: 0.9,
        rate: 0.8,
        pitch: 1.0,
        lang: 'en-US'
      });
    } catch (error) {
      // Fallback to text notification if voice fails
      setState(prev => ({ 
        ...prev, 
        error: `Voice notification failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
      throw error;
    }
  }, [speak]);

  return {
    ...state,
    requestPermissions,
    speak,
    startListening,
    stopListening,
    playBusNotification,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}