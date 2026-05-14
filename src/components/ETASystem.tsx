import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MessageSquare, Clock, MapPin, Activity, Phone, Send, Users } from 'lucide-react';
import { Bus } from '../types';

interface ETASystemProps {
  buses: Bus[];
  className?: string;
}

const ETASystem: React.FC<ETASystemProps> = ({ buses, className = '' }) => {
  const { t } = useTranslation();
  const [busNumber, setBusNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [busDetails, setBusDetails] = useState<Bus | null>(null);
  const [showSMSPreview, setShowSMSPreview] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleGetDetails = async () => {
    if (!busNumber.trim()) {
      setSearchError(t('enterBusNumber'));
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setBusDetails(null);

    // Simulate API call delay
    setTimeout(() => {
      const foundBus = buses.find(bus => 
        bus.busNumber.toLowerCase().includes(busNumber.toLowerCase())
      );

      if (foundBus) {
        setBusDetails(foundBus);
        setSearchError('');
      } else {
        setSearchError(t('busNotFound'));
        setBusDetails(null);
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleSendSMS = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    setShowSMSPreview(true);
    setTimeout(() => setShowSMSPreview(false), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateETA = (bus: Bus) => {
    // Mock ETA calculation based on speed and distance
    const mockDistance = Math.random() * 10 + 1; // 1-11 km
    const eta = Math.round((mockDistance / (bus.speed || 30)) * 60); // minutes
    return Math.max(1, eta);
  };

  const getPassengerCount = (bus: Bus) => {
    // Mock passenger count based on bus capacity and time of day
    const maxCapacity = 45; // Standard bus capacity
    const currentHour = new Date().getHours();
    
    // Peak hours (7-9 AM, 5-7 PM) have higher occupancy
    const isPeakHour = (currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 19);
    const baseOccupancy = isPeakHour ? 0.7 : 0.4;
    
    // Add some randomness
    const occupancyRate = baseOccupancy + (Math.random() * 0.3);
    return Math.min(maxCapacity, Math.round(maxCapacity * occupancyRate));
  };
  const generateSMSPreview = () => {
    if (!busDetails) return '';
    
    const eta = calculateETA(busDetails);
    const passengers = getPassengerCount(busDetails);
    return `${t('busAlert')}: ${busDetails.busNumber} - ${t('estimatedArrival')}: ${eta} ${t('minutes')}. ${t('route')}: ${busDetails.routeId}. ${t('passengers')}: ${passengers}/45. ${t('status')}: ${t(busDetails.status)}. - Punjab Transport`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header Section */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center mb-4 lg:mb-6">
          <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="text-base lg:text-lg font-bold text-gray-900">{t('etaSystem')}</h3>
            <p className="text-xs lg:text-sm text-gray-600">{t('etaSystemDescription')}</p>
        </div>
      </div>

      {/* Bus Search Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 lg:mb-6">
          <h4 className="text-sm lg:text-base font-semibold text-gray-800 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue-600" />
          {t('busSearch')}
        </h4>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('enterBusNumber')}
          </label>
          <div className="space-y-3">
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-500 text-sm lg:text-base"
              placeholder="PB-01-AB-1234"
              onKeyPress={(e) => e.key === 'Enter' && handleGetDetails()}
            />
            <button
              onClick={handleGetDetails}
              disabled={isSearching}
                className={`w-full px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium text-sm lg:text-base ${
                isSearching ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  {t('searching')}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  {t('getDetails')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {searchError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-400 mr-2">⚠️</div>
                <p className="text-xs lg:text-sm text-red-700 font-medium">{searchError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bus Details Card */}
      {busDetails && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6 overflow-hidden">
          {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 -m-4 lg:-m-6 mb-4 lg:mb-6 p-4 lg:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🚌</span>
                </div>
                <div>
                    <h4 className="text-lg lg:text-xl font-bold">{busDetails.busNumber}</h4>
                    <p className="text-blue-100 text-xs lg:text-sm">{busDetails.busModel}</p>
                </div>
              </div>
              <div className="text-right">
                  <span className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg ${getStatusColor(busDetails.status)} border-2 border-white/30`}>
                  {t(busDetails.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 lg:p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide hidden lg:block">{t('estimatedArrival')}</p>
                    <p className="text-xs text-blue-600 font-medium lg:hidden">ETA</p>
                    <p className="text-base lg:text-lg font-bold text-blue-900">
                    {calculateETA(busDetails)} {t('minutes')}
                  </p>
                </div>
              </div>
            </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 lg:p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">{t('route')}</p>
                    <p className="text-base lg:text-lg font-bold text-green-900">
                    {busDetails.routeId}
                  </p>
                </div>
              </div>
            </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 lg:p-4 border border-purple-200">
              <div className="flex items-center space-x-3">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-purple-600 font-medium uppercase tracking-wide hidden lg:block">{t('currentSpeed')}</p>
                    <p className="text-xs text-purple-600 font-medium lg:hidden">Speed</p>
                    <p className="text-base lg:text-lg font-bold text-purple-900">
                    {busDetails.speed} km/h
                  </p>
                </div>
              </div>
            </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 lg:p-4 border border-orange-200">
              <div className="flex items-center space-x-3">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">{t('passengers')}</p>
                    <p className="text-base lg:text-lg font-bold text-orange-900">
                    {getPassengerCount(busDetails)}/45
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
            <div className="bg-gray-50 rounded-lg p-3 lg:p-4 border border-gray-200">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">ℹ️</span>
                </div>
                  <h5 className="text-sm lg:text-base font-semibold text-gray-800">Additional Information</h5>
              </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-xs lg:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Bus Model:</span>
                  <span className="font-medium text-gray-900">{busDetails.busModel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">{t('lastUpdated')}:</span>
                  <span className="font-medium text-gray-900">{busDetails.lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Section */}
      {busDetails && (
          <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-4">
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
                <h4 className="text-sm lg:text-base font-semibold text-gray-900">{t('smsNotification')}</h4>
                <p className="text-xs lg:text-sm text-gray-600">{t('smsNotificationDescription')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneNumber')}
              </label>
              <div className="space-y-3">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-gray-900 placeholder-gray-500 text-sm lg:text-base"
                  placeholder="+91-9876543210"
                />
                <button
                  onClick={handleSendSMS}
                  disabled={!phoneNumber.trim()}
                    className={`w-full px-4 lg:px-6 py-2 lg:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium text-sm lg:text-base ${
                    !phoneNumber.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('sendSMS')}
                </button>
              </div>
            </div>
           
           {/* Sample Bus Numbers */}
           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
               <h5 className="text-xs lg:text-sm font-semibold text-blue-900 mb-2">📋 Sample Bus Numbers to Try:</h5>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm">
               <div className="space-y-1">
                 <button 
                   onClick={() => setBusNumber('PB-01-AB-1234')}
                     className="w-full text-left px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors text-blue-800 text-xs lg:text-sm"
                 >
                   🚌 PB-01-AB-1234 (Active)
                 </button>
                 <button 
                   onClick={() => setBusNumber('PB-05-IJ-7890')}
                     className="w-full text-left px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors text-blue-800 text-xs lg:text-sm"
                 >
                   🚌 PB-05-IJ-7890 (Active)
                 </button>
                 <button 
                   onClick={() => setBusNumber('PB-09-QR-8642')}
                     className="w-full text-left px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors text-blue-800 text-xs lg:text-sm"
                 >
                   🚌 PB-09-QR-8642 (Active)
                 </button>
               </div>
               <div className="space-y-1">
                 <button 
                   onClick={() => setBusNumber('PB-06-KL-2468')}
                     className="w-full text-left px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors text-blue-800 text-xs lg:text-sm"
                 >
                   🚌 PB-06-KL-2468 (Active)
                 </button>
                 <button 
                   onClick={() => setBusNumber('PB-04-GH-3456')}
                     className="w-full text-left px-2 py-1 bg-white border border-orange-200 rounded hover:bg-orange-50 transition-colors text-orange-800 text-xs lg:text-sm"
                 >
                   🔧 PB-04-GH-3456 (Maintenance)
                 </button>
                 <button 
                   onClick={() => setBusNumber('PB-08-OP-9753')}
                     className="w-full text-left px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-800 text-xs lg:text-sm"
                 >
                   ⏸️ PB-08-OP-9753 (Inactive)
                 </button>
               </div>
             </div>
           </div>

            {/* SMS Preview */}
            {showSMSPreview && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <div className="w-6 lg:w-8 h-6 lg:h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                      <h5 className="text-sm lg:text-base font-semibold text-green-900 mb-2">{t('smsPreview')}</h5>
                    <div className="bg-white border border-green-200 rounded-lg p-3">
                        <p className="text-xs lg:text-sm text-gray-800 leading-relaxed">{generateSMSPreview()}</p>
                    </div>
                      <p className="text-xs text-green-700 mt-2 font-medium">
                      {t('smsWouldBeSent')} {phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ETASystem;