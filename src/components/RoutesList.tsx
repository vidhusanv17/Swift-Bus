import React from 'react';
import { useState } from 'react';
import { Route } from '../types';
import { MapPin, Clock, Users } from 'lucide-react';
import RouteDetailsModal from './RouteDetailsModal';

interface RoutesListProps {
  routes: Route[];
  stops: any[];
  buses: any[];
  onViewRouteOnMap?: (routeId: string) => void;
  onSectionChange?: (section: string) => void;
}

const RoutesList: React.FC<RoutesListProps> = ({ routes, stops, buses, onViewRouteOnMap, onSectionChange }) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleViewDetails = (route: Route) => {
    setSelectedRoute(route);
  };

  const handleViewOnMap = (routeId: string) => {
    setSelectedRoute(null);
    // Switch to home section (map view)
    onSectionChange?.('home');
    // Dispatch event to focus on route
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('focusRoute', { detail: { routeId } }));
    }, 100);
    onViewRouteOnMap?.(routeId);
  };

  return (
    <>
      <div className="p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Routes</h2>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: route.color }}
                  ></div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">
                    Route {route.routeNumber}
                  </h3>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  route.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {route.status}
                </span>
              </div>
              
                <h4 className="font-medium text-gray-800 mb-3 text-sm lg:text-base line-clamp-2">{route.name}</h4>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.startStop}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.endStop}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.vehicleCount} vehicle{route.vehicleCount !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{route.stops.length} stops</span>
                </div>
              </div>
              
              <button 
                  className="w-full mt-4 px-3 py-2 text-sm lg:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleViewDetails(route)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Route Details Modal */}
      {selectedRoute && (
        <RouteDetailsModal
          route={selectedRoute}
          stops={stops}
          buses={buses}
          onClose={() => setSelectedRoute(null)}
          onViewOnMap={handleViewOnMap}
        />
      )}
    </>
  );
};

export default RoutesList;