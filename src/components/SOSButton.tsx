import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, MapPin, Phone, X, Send, Clock, User, Bus, FileText } from 'lucide-react';

interface SOSButtonProps {
  onSOSAlert: (alertData: {
    latitude: number;
    longitude: number;
    emergencyLocation: string;
    busNumber: string;
    assistanceType: 'medical' | 'police' | 'fire' | 'mechanical' | 'other';
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }) => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onSOSAlert }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    emergencyLocation: '',
    busNumber: '',
    assistanceType: 'medical' as const,
    description: '',
    priority: 'medium' as const,
    userName: '',
    phoneNumber: ''
  });

  const handleSOSClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const alertData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            emergencyLocation: formData.emergencyLocation,
            busNumber: formData.busNumber,
            assistanceType: formData.assistanceType,
            description: formData.description,
            priority: formData.priority,
            userName: formData.userName,
            phoneNumber: formData.phoneNumber
          };
          
          onSOSAlert(alertData);
          setShowForm(false);
          setShowAlert(true);
          setIsSubmitting(false);
          
          // Reset form
          setFormData({
            emergencyLocation: '',
            busNumber: '',
            assistanceType: 'medical',
            description: '',
            priority: 'medium',
            userName: '',
            phoneNumber: ''
          });
          
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Send SOS without precise location
          const alertData = {
            latitude: 0,
            longitude: 0,
            emergencyLocation: formData.emergencyLocation,
            busNumber: formData.busNumber,
            assistanceType: formData.assistanceType,
            description: formData.description,
            priority: formData.priority,
            userName: formData.userName,
            phoneNumber: formData.phoneNumber
          };
          
          onSOSAlert(alertData);
          setShowForm(false);
          setShowAlert(true);
          setIsSubmitting(false);
          
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        }
      );
    } else {
      // Geolocation not supported
      const alertData = {
        latitude: 0,
        longitude: 0,
        emergencyLocation: formData.emergencyLocation,
        busNumber: formData.busNumber,
        assistanceType: formData.assistanceType,
        description: formData.description,
        priority: formData.priority,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber
      };
      
      onSOSAlert(alertData);
      setShowForm(false);
      setShowAlert(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const getAssistanceIcon = (type: string) => {
    switch (type) {
      case 'medical': return '🚑';
      case 'police': return '🚔';
      case 'fire': return '🚒';
      case 'mechanical': return '🔧';
      default: return '🆘';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <button
        onClick={handleSOSClick}
        disabled={isActive}
        className={`fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
          isActive 
            ? 'bg-orange-500 animate-pulse scale-110' 
            : 'bg-red-600 hover:bg-red-700 hover:scale-105'
        }`}
      >
        <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      {/* SOS Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">{t('emergencyAlert')}</h3>
                    <p className="text-xs lg:text-sm text-gray-600">{t('fillEmergencyDetails')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t('yourName')}
                    </label>
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                      placeholder={t('enterYourName')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>
                </div>

                {/* Emergency Location */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {t('emergencyLocation')}
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyLocation}
                    onChange={(e) => setFormData({ ...formData, emergencyLocation: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                    placeholder={t('emergencyLocationPlaceholder')}
                    required
                  />
                </div>

                {/* Bus Number */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                    <Bus className="w-4 h-4 inline mr-1" />
                    {t('busNumberOptional')}
                  </label>
                  <input
                    type="text"
                    value={formData.busNumber}
                    onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                    placeholder={t('busNumberPlaceholder')}
                  />
                </div>

                {/* Assistance Type */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                    {t('assistanceType')}
                  </label>
                  <select
                    value={formData.assistanceType}
                    onChange={(e) => setFormData({ ...formData, assistanceType: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                    required
                  >
                    <option value="medical">🚑 {t('medicalEmergency')}</option>
                    <option value="police">🚔 {t('policeAssistance')}</option>
                    <option value="fire">🚒 {t('fireEmergency')}</option>
                    <option value="mechanical">🔧 {t('mechanicalBreakdown')}</option>
                    <option value="other">🆘 {t('otherEmergency')}</option>
                  </select>
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                    {t('priorityLevel')}
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                    required
                  >
                    <option value="low">🟢 {t('lowPriority')}</option>
                    <option value="medium">🟡 {t('mediumPriority')}</option>
                    <option value="high">🟠 {t('highPriority')}</option>
                    <option value="critical">🔴 {t('criticalPriority')}</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    {t('emergencyDescription')}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base"
                    rows={3}
                    placeholder={t('emergencyDescriptionPlaceholder')}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors text-sm lg:text-base ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('sendEmergencyAlert')}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm lg:text-base"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 lg:p-6 max-w-sm mx-4 text-center">
            <div className="w-12 lg:w-16 h-12 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
              {t('thanksForSOS')}
            </h3>
            <p className="text-sm lg:text-base text-gray-600 mb-4">
              {t('sosReceived')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;