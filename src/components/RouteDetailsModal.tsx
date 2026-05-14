import React from 'react';
import { Route, Stop, Bus } from '../types';
import { X, MapPin, Clock, Users, Navigation, Activity, Calendar } from 'lucide-react';

interface RouteDetailsModalProps {
  route: Route;
  stops: Stop[];
  buses: Bus[];
  onClose: () => void;
  onViewOnMap: (routeId: string) => void;
}

const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({
  route,
  stops,
  buses,
  onClose,
  onViewOnMap
}) => {
  const routeStops = stops.filter(stop => stop.routes.includes(route.id));
  const routeBuses = buses.filter(bus => bus.routeId === route.id);
  const activeBuses = routeBuses.filter(bus => bus.status === 'active');

  // Mock schedule data
  const scheduleData = [
    { time: '06:00', type: 'departure', location: route.startStop },
    { time: '06:15', type: 'stop', location: routeStops[1]?.name || 'Intermediate Stop' },
    { time: '06:30', type: 'stop', location: routeStops[2]?.name || 'Intermediate Stop' },
    { time: '06:45', type: 'arrival', location: route.endStop },
    { time: '07:00', type: 'departure', location: route.endStop },
    { time: '07:15', type: 'stop', location: routeStops[2]?.name || 'Intermediate Stop' },
    { time: '07:30', type: 'stop', location: routeStops[1]?.name || 'Intermediate Stop' },
    { time: '07:45', type: 'arrival', location: route.startStop },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: route.color }}
            ></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Route {route.routeNumber}</h2>
              <p className="text-gray-600">{route.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Route Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Vehicles</p>
                  <p className="text-2xl font-bold text-blue-900">{activeBuses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Stops</p>
                  <p className="text-2xl font-bold text-green-900">{routeStops.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Frequency</p>
                  <p className="text-2xl font-bold text-purple-900">15 min</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Route Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Navigation className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Route Path</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{route.startStop}</span>
                    </div>
                    <div className="ml-1.5 border-l-2 border-gray-300 h-4"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{route.endStop}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Status</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    route.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Operating Hours</span>
                  </div>
                  <p className="text-sm text-gray-700">06:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{item.time}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'departure' ? 'bg-green-500' :
                        item.type === 'arrival' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm text-gray-700">{item.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stops List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Stops ({routeStops.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routeStops.map((stop, index) => (
                <div key={stop.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{stop.name}</h4>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Code: {stop.code}</p>
                  <div className="flex flex-wrap gap-1">
                    {stop.amenities.slice(0, 2).map((amenity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {stop.amenities.length > 2 && (
                      <span className="text-xs text-gray-500">+{stop.amenities.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Buses */}
          {activeBuses.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Buses ({activeBuses.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeBuses.map((bus) => (
                  <div key={bus.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{bus.busNumber}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{bus.busModel}</p>
                    <p className="text-sm text-gray-600">Speed: {bus.speed} km/h</p>
                    <p className="text-xs text-gray-500">
                      Last updated: {bus.lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onViewOnMap(route.id)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Clock className="w-4 h-4 mr-2" />
              Full Schedule
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Activity className="w-4 h-4 mr-2" />
              Live Tracking
            </button>
            <button 
              onClick={onClose}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsModal;