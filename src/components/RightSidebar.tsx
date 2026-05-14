import React from 'react';
import { Bus, Route, DashboardStats } from '../types';
import { Activity, MapPin, Navigation } from 'lucide-react';
import ETASystem from './ETASystem';

interface RightSidebarProps {
  stats: DashboardStats;
  routes: Route[];
  buses: Bus[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ stats, routes, buses }) => {
  const activeVehicles = buses.filter(bus => bus.status === 'active').length;

  return (
    <div>
        {/* ETA System */}
        <ETASystem buses={buses} className="mb-4 lg:mb-8" />
        
        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">System Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-4 lg:grid-cols-none mb-4 lg:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs lg:text-sm">Active Vehicles</p>
                <p className="text-xl lg:text-2xl font-bold">{activeVehicles}</p>
              </div>
              <Activity className="w-6 lg:w-8 h-6 lg:h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs lg:text-sm">Total Stops</p>
                <p className="text-xl lg:text-2xl font-bold">{stats.totalStops}</p>
              </div>
              <MapPin className="w-6 lg:w-8 h-6 lg:h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs lg:text-sm">Total Routes</p>
                <p className="text-xl lg:text-2xl font-bold">{stats.totalRoutes}</p>
              </div>
              <Navigation className="w-6 lg:w-8 h-6 lg:h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Active Routes */}
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-4">Active Routes</h3>
          <div className="space-y-3 max-h-64 lg:max-h-none overflow-y-auto">
            {routes.filter(route => route.status === 'active').map((route) => (
              <div
                key={route.id}
                className="border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: route.color }}
                    ></div>
                    <span className="text-sm lg:text-base font-semibold text-gray-900">
                      Route {route.routeNumber}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                    Active
                  </span>
                </div>
                
                <h4 className="text-sm lg:text-base font-medium text-gray-800 mb-1 line-clamp-1">{route.name}</h4>
                <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-1">
                  {route.startStop} → {route.endStop}
                </p>
                
                <div className="flex items-center justify-between text-xs lg:text-sm">
                  <span className="text-gray-500">
                    {route.vehicleCount} vehicle{route.vehicleCount !== 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-500">
                    {route.stops.length} stops
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default RightSidebar;