import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('preferred-language') || 'en';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      liveMap: 'Live Map',
      routes: 'Routes',
      stops: 'Stops',
      schedule: 'Schedule',
      dashboard: 'Dashboard',
      buses: 'Buses',
      drivers: 'Drivers',
      adminRoutes: 'Routes',
      adminStops: 'Stops',
      
      // Header
      appTitle: 'Punjab State Transport',
      appSubtitle: 'Real-time vehicle tracking across Punjab',
      lastUpdated: 'Last Updated',
      refresh: 'Refresh',
      
      // Dashboard
      totalBuses: 'Total Buses',
      totalDrivers: 'Total Drivers',
      totalRoutes: 'Total Routes',
      totalStops: 'Total Stops',
      active: 'Active',
      inactive: 'Inactive',
      maintenance: 'Maintenance',
      onBreak: 'On Break',
      
      // Forms
      addBus: 'Add Bus',
      addDriver: 'Add Driver',
      busNumber: 'Bus Number',
      busModel: 'Bus Model',
      name: 'Name',
      phoneNumber: 'Phone Number',
      address: 'Address',
      aadhaarNumber: 'Aadhaar Number',
      drivingLicense: 'Driving License',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      
      // SOS
      sosButton: 'SOS Emergency',
      sosAlert: 'Emergency Alert Sent',
      sosMessage: 'Your location has been shared with the control room',
      
      // Map
      legend: 'Legend',
      activeBus: 'Active Bus',
      busStop: 'Bus Stop',
      
      // Villages/Cities
      amritsar: 'Amritsar',
      ludhiana: 'Ludhiana',
      jalandhar: 'Jalandhar',
      patiala: 'Patiala',
      bathinda: 'Bathinda',
      mohali: 'Mohali',
      
      // Status
      status: 'Status',
      speed: 'Speed',
      actions: 'Actions',
      assignedBus: 'Assigned Bus',
      route: 'Route',
      
      // Active Section
      activeSection: 'Active Section',
      recentActivity: 'Recent Activity',
      busStartedRoute: 'started route',
      driverCheckedIn: 'checked in',
      routeUpdated: 'route updated',
      minutesAgo: 'minutes ago',
      
      // Additional translations
      language: 'Language',
      selectLanguage: 'Select Language',
      english: 'English',
      hindi: 'Hindi',
      punjabi: 'Punjabi',
      
      // SOS translations
      emergency: 'Emergency',
      emergencyAlert: 'Emergency Alert',
      fillEmergencyDetails: 'Fill in emergency details',
      yourName: 'Your Name',
      enterYourName: 'Enter your name',
      phoneNumber: 'Phone Number',
      emergencyLocation: 'Emergency Location',
      emergencyLocationPlaceholder: 'e.g., Amritsar Bus Stand, Platform 3',
      busNumberOptional: 'Bus Number (if applicable)',
      busNumberPlaceholder: 'e.g., PB-01-AB-1234',
      assistanceType: 'Type of Assistance Required',
      medicalEmergency: 'Medical Emergency',
      policeAssistance: 'Police Assistance',
      fireEmergency: 'Fire Emergency',
      mechanicalBreakdown: 'Mechanical Breakdown',
      otherEmergency: 'Other Emergency',
      priorityLevel: 'Priority Level',
      lowPriority: 'Low - Non-urgent assistance',
      mediumPriority: 'Medium - Moderate urgency',
      highPriority: 'High - Urgent assistance needed',
      criticalPriority: 'Critical - Life-threatening emergency',
      emergencyDescription: 'Description of Emergency',
      emergencyDescriptionPlaceholder: 'Please describe the emergency situation in detail...',
      sendEmergencyAlert: 'Send Emergency Alert',
      sending: 'Sending...',
      thanksForSOS: 'Thanks for the SOS request!',
      sosReceived: 'Your SOS request has been received by the control room. Help is on the way.',
      
      // Voice Assistant
      voiceAssistant: 'Voice Assistant',
      voiceFeaturesNotSupported: 'Voice features are not supported in this browser',
      ready: 'Ready',
      permissionsNeeded: 'Permissions needed',
      enableVoice: 'Enable Voice',
      testNotification: 'Test Notification',
      speaking: 'Speaking...',
      stopListening: 'Stop Listening',
      startListening: 'Start Listening',
      listening: 'Listening...',
      enableVoiceAssistant: 'Enable Voice Assistant',
      voiceAssistantPermission: 'The voice assistant needs access to your microphone and speakers to provide audio notifications about approaching buses. This will enhance your experience with real-time voice alerts.',
      features: 'Features:',
      voiceNotifications: 'Voice notifications for approaching buses',
      naturalVoice: 'Natural, human-like voice alerts',
      worksOnMobile: 'Works on desktop and mobile browsers',
      fallbackText: 'Fallback text alerts if voice fails',
      grantPermissions: 'Grant Permissions',
      useTextOnly: 'Use Text Only',
      busAlert: 'Bus Alert',
      
      // Bus Notifications
      nearbyBusAlerts: 'Nearby Bus Alerts',
      approaching: 'Approaching',
      estimatedArrival: 'ETA',
      minute: 'minute',
      minutes: 'minutes',
      distance: 'Distance',
      awayDistance: 'away',
      arrivingSoon: 'Arriving Soon',
      nearby: 'Nearby',
      busComingMessage: 'This bus is coming to your bus stand, kindly be ready.',
      
      // ETA System
      etaSystem: 'ETA System',
      etaSystemDescription: 'Get real-time bus information and notifications',
      busSearch: 'Bus Search',
      enterBusNumber: 'Enter Bus Number',
      getDetails: 'Get Details',
      searching: 'Searching...',
      busNotFound: 'Bus not found. Please check the bus number and try again.',
      currentSpeed: 'Current Speed',
      passengers: 'Passengers',
      smsNotification: 'SMS Notification',
      smsNotificationDescription: 'Send bus details to your phone',
      sendSMS: 'Send SMS',
      smsPreview: 'SMS Preview',
      smsWouldBeSent: 'SMS would be sent to:',
    }
  },
  hi: {
    translation: {
      // Navigation
      home: 'होम',
      liveMap: 'लाइव मैप',
      routes: 'रूट',
      stops: 'स्टॉप',
      schedule: 'समय सारणी',
      dashboard: 'डैशबोर्ड',
      buses: 'बसें',
      drivers: 'ड्राइवर',
      adminRoutes: 'रूट',
      adminStops: 'स्टॉप',
      
      // Header
      appTitle: 'पंजाब राज्य परिवहन',
      appSubtitle: 'पंजाब भर में वास्तविक समय वाहन ट्रैकिंग',
      lastUpdated: 'अंतिम अपडेट',
      refresh: 'रिफ्रेश',
      
      // Dashboard
      totalBuses: 'कुल बसें',
      totalDrivers: 'कुल ड्राइवर',
      totalRoutes: 'कुल रूट',
      totalStops: 'कुल स्टॉप',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      maintenance: 'रखरखाव',
      onBreak: 'विश्राम पर',
      
      // Forms
      addBus: 'बस जोड़ें',
      addDriver: 'ड्राइवर जोड़ें',
      busNumber: 'बस नंबर',
      busModel: 'बस मॉडल',
      name: 'नाम',
      phoneNumber: 'फोन नंबर',
      address: 'पता',
      aadhaarNumber: 'आधार नंबर',
      drivingLicense: 'ड्राइविंग लाइसेंस',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      
      // SOS
      sosButton: 'SOS आपातकाल',
      sosAlert: 'आपातकालीन अलर्ट भेजा गया',
      sosMessage: 'आपका स्थान नियंत्रण कक्ष के साथ साझा किया गया है',
      
      // Map
      legend: 'लेजेंड',
      activeBus: 'सक्रिय बस',
      busStop: 'बस स्टॉप',
      
      // Villages/Cities
      amritsar: 'अमृतसर',
      ludhiana: 'लुधियाना',
      jalandhar: 'जालंधर',
      patiala: 'पटियाला',
      bathinda: 'बठिंडा',
      mohali: 'मोहाली',
      
      // Status
      status: 'स्थिति',
      speed: 'गति',
      actions: 'कार्य',
      assignedBus: 'निर्दिष्ट बस',
      route: 'रूट',
      
      // Active Section
      activeSection: 'सक्रिय अनुभाग',
      recentActivity: 'हाल की गतिविधि',
      busStartedRoute: 'रूट शुरू किया',
      driverCheckedIn: 'चेक इन किया',
      routeUpdated: 'रूट अपडेट किया',
      minutesAgo: 'मिनट पहले',
      
      // Additional translations
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
      english: 'अंग्रेजी',
      hindi: 'हिंदी',
      punjabi: 'पंजाबी',
      
      // SOS translations
      emergency: 'आपातकाल',
      emergencyAlert: 'आपातकालीन अलर्ट',
      fillEmergencyDetails: 'आपातकालीन विवरण भरें',
      yourName: 'आपका नाम',
      enterYourName: 'अपना नाम दर्ज करें',
      phoneNumber: 'फोन नंबर',
      emergencyLocation: 'आपातकालीन स्थान',
      emergencyLocationPlaceholder: 'जैसे, अमृतसर बस स्टैंड, प्लेटफॉर्म 3',
      busNumberOptional: 'बस नंबर (यदि लागू हो)',
      busNumberPlaceholder: 'जैसे, PB-01-AB-1234',
      assistanceType: 'आवश्यक सहायता का प्रकार',
      medicalEmergency: 'चिकित्सा आपातकाल',
      policeAssistance: 'पुलिस सहायता',
      fireEmergency: 'अग्नि आपातकाल',
      mechanicalBreakdown: 'यांत्रिक खराबी',
      otherEmergency: 'अन्य आपातकाल',
      priorityLevel: 'प्राथमिकता स्तर',
      lowPriority: 'कम - गैर-जरूरी सहायता',
      mediumPriority: 'मध्यम - मध्यम तात्कालिकता',
      highPriority: 'उच्च - तत्काल सहायता की आवश्यकता',
      criticalPriority: 'गंभीर - जीवन-घातक आपातकाल',
      emergencyDescription: 'आपातकाल का विवरण',
      emergencyDescriptionPlaceholder: 'कृपया आपातकालीन स्थिति का विस्तार से वर्णन करें...',
      sendEmergencyAlert: 'आपातकालीन अलर्ट भेजें',
      sending: 'भेजा जा रहा है...',
      thanksForSOS: 'SOS अनुरोध के लिए धन्यवाद!',
      sosReceived: 'आपका SOS अनुरोध नियंत्रण कक्ष द्वारा प्राप्त किया गया है। सहायता आ रही है।',
      
      // Voice Assistant
      voiceAssistant: 'वॉयस असिस्टेंट',
      voiceFeaturesNotSupported: 'इस ब्राउज़र में वॉयस सुविधाएं समर्थित नहीं हैं',
      ready: 'तैयार',
      permissionsNeeded: 'अनुमतियों की आवश्यकता',
      enableVoice: 'वॉयस सक्षम करें',
      testNotification: 'टेस्ट नोटिफिकेशन',
      speaking: 'बोल रहा है...',
      stopListening: 'सुनना बंद करें',
      startListening: 'सुनना शुरू करें',
      listening: 'सुन रहा है...',
      enableVoiceAssistant: 'वॉयस असिस्टेंट सक्षम करें',
      voiceAssistantPermission: 'वॉयस असिस्टेंट को आपके माइक्रोफोन और स्पीकर तक पहुंच की आवश्यकता है ताकि आने वाली बसों के बारे में ऑडियो नोटिफिकेशन प्रदान कर सके।',
      features: 'सुविधाएं:',
      voiceNotifications: 'आने वाली बसों के लिए वॉयस नोटिफिकेशन',
      naturalVoice: 'प्राकृतिक, मानव-जैसी वॉयस अलर्ट',
      worksOnMobile: 'डेस्कटॉप और मोबाइल ब्राउज़र पर काम करता है',
      fallbackText: 'वॉयस विफल होने पर फॉलबैक टेक्स्ट अलर्ट',
      grantPermissions: 'अनुमतियां दें',
      useTextOnly: 'केवल टेक्स्ट का उपयोग करें',
      busAlert: 'बस अलर्ट',
      
      // Bus Notifications
      nearbyBusAlerts: 'नजदीकी बस अलर्ट',
      approaching: 'पहुंच रहा है',
      estimatedArrival: 'अनुमानित आगमन',
      minute: 'मिनट',
      minutes: 'मिनट',
      distance: 'दूरी',
      awayDistance: 'दूर',
      arrivingSoon: 'जल्द आ रहा है',
      nearby: 'नजदीक',
      busComingMessage: 'यह बस आपके बस स्टैंड पर आ रही है, कृपया तैयार रहें।',
      
      // ETA System
      etaSystem: 'ETA सिस्टम',
      etaSystemDescription: 'रीयल-टाइम बस जानकारी और सूचनाएं प्राप्त करें',
      busSearch: 'बस खोज',
      enterBusNumber: 'बस नंबर दर्ज करें',
      getDetails: 'विवरण प्राप्त करें',
      searching: 'खोज रहे हैं...',
      busNotFound: 'बस नहीं मिली। कृपया बस नंबर जांचें और पुनः प्रयास करें।',
      currentSpeed: 'वर्तमान गति',
      passengers: 'यात्री',
      smsNotification: 'SMS सूचना',
      smsNotificationDescription: 'अपने फोन पर बस विवरण भेजें',
      sendSMS: 'SMS भेजें',
      smsPreview: 'SMS पूर्वावलोकन',
      smsWouldBeSent: 'SMS भेजा जाएगा:',
    }
  },
  pa: {
    translation: {
      // Navigation
      home: 'ਘਰ',
      liveMap: 'ਲਾਈਵ ਮੈਪ',
      routes: 'ਰੂਟ',
      stops: 'ਸਟਾਪ',
      schedule: 'ਸਮਾਂ ਸਾਰਣੀ',
      dashboard: 'ਡੈਸ਼ਬੋਰਡ',
      buses: 'ਬੱਸਾਂ',
      drivers: 'ਡਰਾਈਵਰ',
      adminRoutes: 'ਰੂਟ',
      adminStops: 'ਸਟਾਪ',
      
      // Header
      appTitle: 'ਪੰਜਾਬ ਰਾਜ ਟਰਾਂਸਪੋਰਟ',
      appSubtitle: 'ਪੰਜਾਬ ਭਰ ਵਿੱਚ ਰੀਅਲ-ਟਾਈਮ ਵਾਹਨ ਟਰੈਕਿੰਗ',
      lastUpdated: 'ਆਖਰੀ ਅਪਡੇਟ',
      refresh: 'ਰਿਫਰੈਸ਼',
      
      // Dashboard
      totalBuses: 'ਕੁੱਲ ਬੱਸਾਂ',
      totalDrivers: 'ਕੁੱਲ ਡਰਾਈਵਰ',
      totalRoutes: 'ਕੁੱਲ ਰੂਟ',
      totalStops: 'ਕੁੱਲ ਸਟਾਪ',
      active: 'ਸਰਗਰਮ',
      inactive: 'ਨਿਸ਼ਕਿਰਿਆ',
      maintenance: 'ਰੱਖ-ਰਖਾਅ',
      onBreak: 'ਬਰੇਕ ਤੇ',
      
      // Forms
      addBus: 'ਬੱਸ ਜੋੜੋ',
      addDriver: 'ਡਰਾਈਵਰ ਜੋੜੋ',
      busNumber: 'ਬੱਸ ਨੰਬਰ',
      busModel: 'ਬੱਸ ਮਾਡਲ',
      name: 'ਨਾਮ',
      phoneNumber: 'ਫੋਨ ਨੰਬਰ',
      address: 'ਪਤਾ',
      aadhaarNumber: 'ਆਧਾਰ ਨੰਬਰ',
      drivingLicense: 'ਡਰਾਈਵਿੰਗ ਲਾਈਸੈਂਸ',
      save: 'ਸੇਵ ਕਰੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
      delete: 'ਮਿਟਾਓ',
      
      // SOS
      sosButton: 'SOS ਐਮਰਜੈਂਸੀ',
      sosAlert: 'ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਭੇਜਿਆ ਗਿਆ',
      sosMessage: 'ਤੁਹਾਡਾ ਸਥਾਨ ਕੰਟਰੋਲ ਰੂਮ ਨਾਲ ਸਾਂਝਾ ਕੀਤਾ ਗਿਆ ਹੈ',
      
      // Map
      legend: 'ਲੀਜੈਂਡ',
      activeBus: 'ਸਰਗਰਮ ਬੱਸ',
      busStop: 'ਬੱਸ ਸਟਾਪ',
      
      // Villages/Cities
      amritsar: 'ਅਮ੍ਰਿਤਸਰ',
      ludhiana: 'ਲੁਧਿਆਣਾ',
      jalandhar: 'ਜਲੰਧਰ',
      patiala: 'ਪਟਿਆਲਾ',
      bathinda: 'ਬਠਿੰਡਾ',
      mohali: 'ਮੋਹਾਲੀ',
      
      // Status
      status: 'ਸਥਿਤੀ',
      speed: 'ਗਤੀ',
      actions: 'ਕਾਰਵਾਈਆਂ',
      assignedBus: 'ਨਿਰਧਾਰਿਤ ਬੱਸ',
      route: 'ਰੂਟ',
      
      // Active Section
      activeSection: 'ਸਰਗਰਮ ਸੈਕਸ਼ਨ',
      recentActivity: 'ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ',
      busStartedRoute: 'ਰੂਟ ਸ਼ੁਰੂ ਕੀਤਾ',
      driverCheckedIn: 'ਚੈੱਕ ਇਨ ਕੀਤਾ',
      routeUpdated: 'ਰੂਟ ਅਪਡੇਟ ਕੀਤਾ',
      minutesAgo: 'ਮਿੰਟ ਪਹਿਲਾਂ',
      
      // Additional translations
      language: 'ਭਾਸ਼ਾ',
      selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
      english: 'ਅੰਗਰੇਜ਼ੀ',
      hindi: 'ਹਿੰਦੀ',
      punjabi: 'ਪੰਜਾਬੀ',
      
      // SOS translations
      emergency: 'ਐਮਰਜੈਂਸੀ',
      emergencyAlert: 'ਐਮਰਜੈਂਸੀ ਅਲਰਟ',
      fillEmergencyDetails: 'ਐਮਰਜੈਂਸੀ ਵੇਰਵੇ ਭਰੋ',
      yourName: 'ਤੁਹਾਡਾ ਨਾਮ',
      enterYourName: 'ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ',
      phoneNumber: 'ਫੋਨ ਨੰਬਰ',
      emergencyLocation: 'ਐਮਰਜੈਂਸੀ ਸਥਾਨ',
      emergencyLocationPlaceholder: 'ਜਿਵੇਂ, ਅੰਮ੍ਰਿਤਸਰ ਬੱਸ ਸਟੈਂਡ, ਪਲੇਟਫਾਰਮ 3',
      busNumberOptional: 'ਬੱਸ ਨੰਬਰ (ਜੇ ਲਾਗੂ ਹੋਵੇ)',
      busNumberPlaceholder: 'ਜਿਵੇਂ, PB-01-AB-1234',
      assistanceType: 'ਲੋੜੀਂਦੀ ਸਹਾਇਤਾ ਦੀ ਕਿਸਮ',
      medicalEmergency: 'ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ',
      policeAssistance: 'ਪੁਲਿਸ ਸਹਾਇਤਾ',
      fireEmergency: 'ਅੱਗ ਐਮਰਜੈਂਸੀ',
      mechanicalBreakdown: 'ਮਕੈਨੀਕਲ ਖਰਾਬੀ',
      otherEmergency: 'ਹੋਰ ਐਮਰਜੈਂਸੀ',
      priorityLevel: 'ਤਰਜੀਹ ਪੱਧਰ',
      lowPriority: 'ਘੱਟ - ਗੈਰ-ਜ਼ਰੂਰੀ ਸਹਾਇਤਾ',
      mediumPriority: 'ਮੱਧਮ - ਮੱਧਮ ਤਤਕਾਲਤਾ',
      highPriority: 'ਉੱਚ - ਤਤਕਾਲ ਸਹਾਇਤਾ ਦੀ ਲੋੜ',
      criticalPriority: 'ਗੰਭੀਰ - ਜਾਨਲੇਵਾ ਐਮਰਜੈਂਸੀ',
      emergencyDescription: 'ਐਮਰਜੈਂਸੀ ਦਾ ਵੇਰਵਾ',
      emergencyDescriptionPlaceholder: 'ਕਿਰਪਾ ਕਰਕੇ ਐਮਰਜੈਂਸੀ ਸਥਿਤੀ ਦਾ ਵਿਸਥਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ...',
      sendEmergencyAlert: 'ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਭੇਜੋ',
      sending: 'ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
      thanksForSOS: 'SOS ਬੇਨਤੀ ਲਈ ਧੰਨਵਾਦ!',
      sosReceived: 'ਤੁਹਾਡੀ SOS ਬੇਨਤੀ ਕੰਟਰੋਲ ਰੂਮ ਦੁਆਰਾ ਪ੍ਰਾਪਤ ਕੀਤੀ ਗਈ ਹੈ। ਮਦਦ ਆ ਰਹੀ ਹੈ।',
      
      // Voice Assistant
      voiceAssistant: 'ਵੌਇਸ ਅਸਿਸਟੈਂਟ',
      voiceFeaturesNotSupported: 'ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਫੀਚਰ ਸਮਰਥਿਤ ਨਹੀਂ ਹਨ',
      ready: 'ਤਿਆਰ',
      permissionsNeeded: 'ਇਜਾਜ਼ਤਾਂ ਦੀ ਲੋੜ',
      enableVoice: 'ਵੌਇਸ ਸਮਰੱਥ ਕਰੋ',
      testNotification: 'ਟੈਸਟ ਨੋਟੀਫਿਕੇਸ਼ਨ',
      speaking: 'ਬੋਲ ਰਿਹਾ ਹੈ...',
      stopListening: 'ਸੁਣਨਾ ਬੰਦ ਕਰੋ',
      startListening: 'ਸੁਣਨਾ ਸ਼ੁਰੂ ਕਰੋ',
      listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
      enableVoiceAssistant: 'ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਸਮਰੱਥ ਕਰੋ',
      voiceAssistantPermission: 'ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਨੂੰ ਆਉਣ ਵਾਲੀਆਂ ਬੱਸਾਂ ਬਾਰੇ ਆਡੀਓ ਨੋਟੀਫਿਕੇਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਤੁਹਾਡੇ ਮਾਈਕ੍ਰੋਫੋਨ ਅਤੇ ਸਪੀਕਰ ਤੱਕ ਪਹੁੰਚ ਦੀ ਲੋੜ ਹੈ।',
      features: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ:',
      voiceNotifications: 'ਆਉਣ ਵਾਲੀਆਂ ਬੱਸਾਂ ਲਈ ਵੌਇਸ ਨੋਟੀਫਿਕੇਸ਼ਨ',
      naturalVoice: 'ਕੁਦਰਤੀ, ਮਨੁੱਖੀ-ਵਰਗੀ ਵੌਇਸ ਅਲਰਟ',
      worksOnMobile: 'ਡੈਸਕਟਾਪ ਅਤੇ ਮੋਬਾਈਲ ਬ੍ਰਾਊਜ਼ਰਾਂ ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ',
      fallbackText: 'ਵੌਇਸ ਫੇਲ ਹੋਣ \'ਤੇ ਫਾਲਬੈਕ ਟੈਕਸਟ ਅਲਰਟ',
      grantPermissions: 'ਇਜਾਜ਼ਤਾਂ ਦਿਓ',
      useTextOnly: 'ਸਿਰਫ਼ ਟੈਕਸਟ ਵਰਤੋ',
      busAlert: 'ਬੱਸ ਅਲਰਟ',
      
      // Bus Notifications
      nearbyBusAlerts: 'ਨੇੜਲੇ ਬੱਸ ਅਲਰਟ',
      approaching: 'ਪਹੁੰਚ ਰਿਹਾ ਹੈ',
      estimatedArrival: 'ਅਨੁਮਾਨਿਤ ਆਗਮਨ',
      minute: 'ਮਿੰਟ',
      minutes: 'ਮਿੰਟ',
      distance: 'ਦੂਰੀ',
      awayDistance: 'ਦੂਰ',
      arrivingSoon: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ',
      nearby: 'ਨੇੜੇ',
      busComingMessage: 'ਇਹ ਬੱਸ ਤੁਹਾਡੇ ਬੱਸ ਸਟੈਂਡ ਤੇ ਆ ਰਹੀ ਹੈ, ਕਿਰਪਾ ਕਰਕੇ ਤਿਆਰ ਰਹੋ।',
      
      // ETA System
      etaSystem: 'ETA ਸਿਸਟਮ',
      etaSystemDescription: 'ਰੀਅਲ-ਟਾਈਮ ਬੱਸ ਜਾਣਕਾਰੀ ਅਤੇ ਸੂਚਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
      busSearch: 'ਬੱਸ ਖੋਜ',
      enterBusNumber: 'ਬੱਸ ਨੰਬਰ ਦਰਜ ਕਰੋ',
      getDetails: 'ਵੇਰਵੇ ਪ੍ਰਾਪਤ ਕਰੋ',
      searching: 'ਖੋਜ ਰਹੇ ਹਾਂ...',
      busNotFound: 'ਬੱਸ ਨਹੀਂ ਮਿਲੀ। ਕਿਰਪਾ ਕਰਕੇ ਬੱਸ ਨੰਬਰ ਜਾਂਚੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      currentSpeed: 'ਮੌਜੂਦਾ ਗਤੀ',
      passengers: 'ਯਾਤਰੀ',
      smsNotification: 'SMS ਸੂਚਨਾ',
      smsNotificationDescription: 'ਆਪਣੇ ਫੋਨ ਤੇ ਬੱਸ ਵੇਰਵੇ ਭੇਜੋ',
      sendSMS: 'SMS ਭੇਜੋ',
      smsPreview: 'SMS ਪੂਰਵਦਰਸ਼ਨ',
      smsWouldBeSent: 'SMS ਭੇਜਿਆ ਜਾਵੇਗਾ:',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferred-language', lng);
});

export default i18n;