import React from 'react';
import { Stop, Route, Bus } from '../types';
import { X, MapPin, Navigation, Clock, Wifi, Monitor, Users, Activity } from 'lucide-react';

interface StopDetailsModalProps {
  stop: Stop;
  routes: Route[];
  buses: Bus[];
  onClose: () => void;
  onViewOnMap: (stopId: string) => void;
}

const StopDetailsModal: React.FC<StopDetailsModalProps> = ({
  stop,
  routes,
  buses,
  onClose,
  onViewOnMap
}) => {
  const stopRoutes = routes.filter(route => stop.routes.includes(route.id));
  const nearbyBuses = buses.filter(bus => {
    // Calculate if bus is within 1km of the stop
    const distance = Math.sqrt(
      Math.pow(bus.latitude - stop.latitude, 2) + 
      Math.pow(bus.longitude - stop.longitude, 2)
    ) * 111000; // Rough conversion to meters
    return distance <= 1000 && bus.status === 'active';
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'digital display':
        return <Monitor className="w-4 h-4" />;
      case 'seating':
        return <Users className="w-4 h-4" />;
      case 'shelter':
        return <Activity className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  // Mock arrival times
  const upcomingArrivals = [
    { routeNumber: '101', busNumber: 'PB-01-AB-1234', eta: 3, destination: 'Ludhiana Central' },
    { routeNumber: '202', busNumber: 'PB-02-CD-5678', eta: 7, destination: 'Patiala ISBT' },
    { routeNumber: '101', busNumber: 'PB-03-EF-9012', eta: 18, destination: 'Amritsar Bus Stand' },
    { routeNumber: '303', busNumber: 'PB-04-GH-3456', eta: 25, destination: 'Mohali Phase 8' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{stop.name}</h2>
              <p className="text-gray-600">Stop Code: {stop.code}</p>
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
          {/* Stop Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Navigation className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Connected Routes</p>
                  <p className="text-2xl font-bold text-blue-900">{stopRoutes.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Nearby Buses</p>
                  <p className="text-2xl font-bold text-green-900">{nearbyBuses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Amenities</p>
                  <p className="text-2xl font-bold text-purple-900">{stop.amenities.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stop Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stop Information</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Location</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {stop.latitude.toFixed(6)}, {stop.longitude.toFixed(6)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Available Amenities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {stop.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border">
                        {getAmenityIcon(amenity)}
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Operating Hours</span>
                  </div>
                  <p className="text-sm text-gray-700">24/7 Service Available</p>
                </div>
              </div>
            </div>

            {/* Live Arrivals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Arrivals</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {upcomingArrivals.map((arrival, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">Route {arrival.routeNumber}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          arrival.eta <= 5 ? 'bg-red-100 text-red-800' :
                          arrival.eta <= 10 ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {arrival.eta} min
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{arrival.busNumber}</p>
                      <p className="text-xs text-gray-500">To: {arrival.destination}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected Routes */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Routes ({stopRoutes.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stopRoutes.map((route) => (
                <div key={route.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: route.color }}
                    ></div>
                    <h4 className="font-medium text-gray-900">Route {route.routeNumber}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{route.name}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{route.vehicleCount} vehicles</span>
                    <span className={`px-2 py-1 rounded-full ${
                      route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {route.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Buses */}
          {nearbyBuses.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Buses ({nearbyBuses.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyBuses.map((bus) => (
                  <div key={bus.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{bus.busNumber}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Approaching
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Route: {bus.routeId}</p>
                    <p className="text-sm text-gray-600">Speed: {bus.speed} km/h</p>
                    <p className="text-xs text-gray-500">
                      ETA: ~{Math.floor(Math.random() * 10) + 1} minutes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onViewOnMap(stop.id)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Clock className="w-4 h-4 mr-2" />
              Live Arrivals
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
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

export default StopDetailsModal;