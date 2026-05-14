import React from 'react';
import { Route } from '../types';
import { Clock, Calendar, MapPin } from 'lucide-react';

interface ScheduleViewProps {
  routes: Route[];
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ routes }) => {
  // Mock schedule data
  const schedules = [
    { time: '06:00', route: '101', destination: 'Airport' },
    { time: '06:15', route: '202', destination: 'Tech Park' },
    { time: '06:30', route: '303', destination: 'Forum Mall' },
    { time: '06:45', route: '101', destination: 'City Center' },
    { time: '07:00', route: '202', destination: 'Railway Station' },
    { time: '07:15', route: '303', destination: 'University' },
    { time: '07:30', route: '101', destination: 'Airport' },
    { time: '07:45', route: '202', destination: 'Tech Park' },
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Schedule</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3 max-h-64 lg:max-h-96 overflow-y-auto">
              {schedules.map((schedule, index) => {
                const route = routes.find(r => r.routeNumber === schedule.route);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{schedule.time}</span>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: route?.color || '#6B7280' }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        Route {schedule.route}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs lg:text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline">{schedule.destination}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Route Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
            <div className="space-y-4 max-h-64 lg:max-h-96 overflow-y-auto">
              {routes.filter(route => route.status === 'active').map((route) => (
                <div key={route.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: route.color }}
                    ></div>
                    <h4 className="font-semibold text-gray-900">
                      Route {route.routeNumber}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{route.name}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex justify-between"><span>Frequency:</span><span>Every 15 min</span></p>
                    <p className="flex justify-between"><span>Hours:</span><span>06:00 - 22:00</span></p>
                    <p className="flex justify-between"><span>Vehicles:</span><span>{route.vehicleCount}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;