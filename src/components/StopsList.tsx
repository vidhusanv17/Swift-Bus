import React from 'react';
import { useState } from 'react';
import { Stop } from '../types';
import { MapPin, Navigation, Wifi, Monitor } from 'lucide-react';
import StopDetailsModal from './StopDetailsModal';

interface StopsListProps {
  stops: Stop[];
  routes: any[];
  buses: any[];
  onViewOnMap?: (stopId: string) => void;
  onSectionChange?: (section: string) => void;
}

const StopsList: React.FC<StopsListProps> = ({ stops, routes, buses, onViewOnMap, onSectionChange }) => {
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  const handleViewDetails = (stop: Stop) => {
    setSelectedStop(stop);
  };

  const handleViewOnMap = (stopId: string) => {
    setSelectedStop(null);
    
    // Switch to home section (map view)
    onSectionChange?.('home');
    
    // Find the stop and center map on it
    const stop = stops.find(s => s.id === stopId);
    if (stop) {
      // Delay to ensure map is loaded
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('focusStop', { detail: { stop } }));
      }, 100);
    }
    
    onViewOnMap?.(stopId);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'digital display':
        return <Monitor className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className="p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Bus Stops</h2>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {stops.map((stop) => (
            <div key={stop.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-4 lg:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {stop.name}
                  </h3>
                  <p className="text-sm text-gray-500">Code: {stop.code}</p>
                </div>
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <Navigation className="w-4 h-4 inline mr-1 flex-shrink-0" />
                  Routes: {stop.routes.join(', ')}
                </p>
                <p className="text-xs text-gray-500">
                  {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-2">
                  {stop.amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {stop.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{stop.amenities.length - 3} more</span>
                  )}
                </div>
              </div>
              
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                  <button 
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => handleViewDetails(stop)}
                >
                  View Details
                </button>
                  <button 
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => handleViewOnMap(stop.id)}
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Stop Details Modal */}
      {selectedStop && (
        <StopDetailsModal
          stop={selectedStop}
          routes={routes}
          buses={buses}
          onClose={() => setSelectedStop(null)}
          onViewOnMap={handleViewOnMap}
        />
      )}
    </>
  );
};

export default StopsList;