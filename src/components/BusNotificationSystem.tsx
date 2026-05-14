import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bus, Stop } from '../types';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface BusNotificationSystemProps {
  buses: Bus[];
  stops: Stop[];
  userLocation?: { latitude: number; longitude: number };
  className?: string;
}

interface BusAlert {
  id: string;
  busNumber: string;
  stopName: string;
  estimatedArrival: number; // minutes
  distance: number; // meters
}

const BusNotificationSystem: React.FC<BusNotificationSystemProps> = ({
  buses,
  stops,
  userLocation,
  className = ''
}) => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<BusAlert[]>([]);
  const [notifiedBuses, setNotifiedBuses] = useState<Set<string>>(new Set());
  const { hasPermissions, playBusNotification } = useVoiceAssistant();

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (
    lat1: number, lon1: number, 
    lat2: number, lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Check for nearby buses and create alerts
  useEffect(() => {
    if (!userLocation) return;

    const nearbyAlerts: BusAlert[] = [];
    const alertThreshold = 500; // 500 meters
    const notificationThreshold = 200; // 200 meters for voice notification

    buses.forEach(bus => {
      if (bus.status !== 'active') return;

      // Find the nearest stop to the bus
      let nearestStop: Stop | null = null;
      let minDistance = Infinity;

      stops.forEach(stop => {
        const distance = calculateDistance(
          bus.latitude, bus.longitude,
          stop.latitude, stop.longitude
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestStop = stop;
        }
      });

      if (!nearestStop) return;

      // Calculate distance from user to the stop
      const userToStopDistance = calculateDistance(
        userLocation.latitude, userLocation.longitude,
        nearestStop.latitude, nearestStop.longitude
      );

      // Calculate distance from bus to the stop
      const busToStopDistance = calculateDistance(
        bus.latitude, bus.longitude,
        nearestStop.latitude, nearestStop.longitude
      );

      // If user is near a stop and bus is approaching
      if (userToStopDistance <= alertThreshold && busToStopDistance <= alertThreshold) {
        const estimatedArrival = Math.max(1, Math.round(busToStopDistance / (bus.speed * 16.67))); // Convert km/h to m/min
        
        nearbyAlerts.push({
          id: `${bus.id}-${nearestStop.id}`,
          busNumber: bus.busNumber,
          stopName: nearestStop.name,
          estimatedArrival,
          distance: busToStopDistance
        });

        // Trigger voice notification for very close buses
        if (busToStopDistance <= notificationThreshold && 
            !notifiedBuses.has(bus.id) && 
            hasPermissions) {
          
          playBusNotification().catch(console.error);
          setNotifiedBuses(prev => new Set(prev).add(bus.id));
          
          // Remove from notified set after 5 minutes
          setTimeout(() => {
            setNotifiedBuses(prev => {
              const newSet = new Set(prev);
              newSet.delete(bus.id);
              return newSet;
            });
          }, 5 * 60 * 1000);
        }
      }
    });

    setAlerts(nearbyAlerts);
  }, [buses, stops, userLocation, hasPermissions, playBusNotification, notifiedBuses]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
        {t('nearbyBusAlerts')}
      </h3>
      
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-blue-900">
                  Bus {alert.busNumber}
                </h4>
              </div>
              
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('approaching')} {alert.stopName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {t('estimatedArrival')}: {alert.estimatedArrival} {alert.estimatedArrival !== 1 ? t('minutes') : t('minute')}
                  </span>
                </div>
                <div className="text-xs text-blue-600">
                  {t('distance')}: {Math.round(alert.distance)}m {t('awayDistance')}
                </div>
              </div>
            </div>
            
            <div className="ml-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                alert.distance <= 200 
                  ? 'bg-red-100 text-red-800' 
                  : alert.distance <= 350
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {alert.distance <= 200 ? t('arrivingSoon') : 
                 alert.distance <= 350 ? t('approaching') : t('nearby')}
              </div>
            </div>
          </div>
          
          {alert.distance <= 200 && (
            <div className="mt-3 p-2 bg-blue-100 rounded text-sm text-blue-800 font-medium">
              🚌 {t('busComingMessage')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusNotificationSystem;