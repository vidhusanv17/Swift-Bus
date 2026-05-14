import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle, CheckCircle, Settings } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface VoiceAssistantProps {
  onBusApproaching?: () => void;
  className?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onBusApproaching, className = '' }) => {
  const { t } = useTranslation();
  const {
    isSupported,
    hasPermissions,
    isListening,
    isSpeaking,
    error,
    requestPermissions,
    playBusNotification,
    startListening,
    stopListening,
  } = useVoiceAssistant();

  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showTextFallback, setShowTextFallback] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  // Auto-request permissions on component mount if supported
  useEffect(() => {
    if (isSupported && !hasPermissions) {
      setShowPermissionModal(true);
    }
  }, [isSupported, hasPermissions]);

  const handleRequestPermissions = async () => {
    try {
      const granted = await requestPermissions();
      if (granted) {
        setIsEnabled(true);
        setShowPermissionModal(false);
        setShowTextFallback(false);
      } else {
        setShowTextFallback(true);
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      setShowTextFallback(true);
    }
  };

  const handlePlayNotification = async () => {
    const message = "This bus is coming to your bus stand, kindly be ready.";
    
    if (hasPermissions && isEnabled) {
      try {
        await playBusNotification();
        onBusApproaching?.();
      } catch (error) {
        console.error('Voice notification failed:', error);
        // Show text fallback
        setNotificationText(message);
        setShowTextFallback(true);
        setTimeout(() => setShowTextFallback(false), 5000);
      }
    } else {
      // Show text fallback
      setNotificationText(message);
      setShowTextFallback(true);
      setTimeout(() => setShowTextFallback(false), 5000);
    }
  };

  const handleToggleListening = async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        await startListening();
      } catch (error) {
        console.error('Failed to start listening:', error);
      }
    }
  };

  if (!isSupported) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">
            {t('voiceFeaturesNotSupported')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Voice Assistant Controls */}
      <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
            {t('voiceAssistant')}
          </h3>
          <div className="flex items-center space-x-2">
            {hasPermissions ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">{t('status')}:</span>
            {hasPermissions ? (
              <span className="text-green-600 font-medium">{t('ready')}</span>
            ) : (
              <span className="text-yellow-600 font-medium">{t('permissionsNeeded')}</span>
            )}
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          {!hasPermissions && (
            <button
              onClick={() => setShowPermissionModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('enableVoice')}
            </button>
          )}

          {hasPermissions && (
            <>
              <button
                onClick={handlePlayNotification}
                disabled={isSpeaking}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isSpeaking
                    ? 'bg-orange-100 text-orange-700 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                    {t('speaking')}
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    {t('testNotification')}
                  </>
                )}
              </button>

              <button
                onClick={handleToggleListening}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    {t('stopListening')}
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    {t('startListening')}
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Voice Activity Indicator */}
        {(isListening || isSpeaking) && (
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-full animate-pulse ${
                    isListening ? 'bg-red-400' : 'bg-green-400'
                  }`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {isListening ? t('listening') : t('speaking')}
            </span>
          </div>
        )}
      </div>

      {/* Permission Request Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <Volume2 className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                {t('enableVoiceAssistant')}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              {t('voiceAssistantPermission')}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">{t('features')}</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('voiceNotifications')}</li>
                <li>• {t('naturalVoice')}</li>
                <li>• {t('worksOnMobile')}</li>
                <li>• {t('fallbackText')}</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleRequestPermissions}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('grantPermissions')}
              </button>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  setShowTextFallback(true);
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {t('useTextOnly')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Fallback Notification */}
      {showTextFallback && notificationText && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">{t('busAlert')}</h4>
              <p className="text-sm text-blue-100">{notificationText}</p>
            </div>
            <button
              onClick={() => setShowTextFallback(false)}
              className="text-blue-200 hover:text-white"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;