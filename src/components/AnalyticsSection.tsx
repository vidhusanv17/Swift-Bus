import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Bus, Driver, Route } from '../types';
import { TrendingUp, Users, Activity, MapPin } from 'lucide-react';

interface AnalyticsSectionProps {
  buses: Bus[];
  drivers: Driver[];
  routes: Route[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ buses, drivers, routes }) => {
  // Bar Chart Data - Buses per Route
  const busesPerRoute = routes.map(route => ({
    routeNumber: `Route ${route.routeNumber}`,
    buses: buses.filter(bus => bus.routeId === route.id).length,
    activeBuses: buses.filter(bus => bus.routeId === route.id && bus.status === 'active').length,
    routeName: route.name.length > 20 ? route.name.substring(0, 20) + '...' : route.name
  }));

  // Pie Chart Data - Driver Status Distribution
  const driverStatusData = [
    {
      name: 'Active',
      value: drivers.filter(d => d.status === 'active').length,
      color: '#10B981'
    },
    {
      name: 'Inactive',
      value: drivers.filter(d => d.status === 'inactive').length,
      color: '#6B7280'
    },
    {
      name: 'On Break',
      value: drivers.filter(d => d.status === 'on-break').length,
      color: '#F59E0B'
    }
  ];

  // Line Chart Data - Passenger Growth Trends (Mock Data)
  const passengerTrends = [
    { month: 'Jan', passengers: 12500, revenue: 125000 },
    { month: 'Feb', passengers: 13200, revenue: 132000 },
    { month: 'Mar', passengers: 14800, revenue: 148000 },
    { month: 'Apr', passengers: 16200, revenue: 162000 },
    { month: 'May', passengers: 15800, revenue: 158000 },
    { month: 'Jun', passengers: 17500, revenue: 175000 },
    { month: 'Jul', passengers: 18900, revenue: 189000 },
    { month: 'Aug', passengers: 19200, revenue: 192000 },
    { month: 'Sep', passengers: 20100, revenue: 201000 },
    { month: 'Oct', passengers: 21500, revenue: 215000 },
    { month: 'Nov', passengers: 22800, revenue: 228000 },
    { month: 'Dec', passengers: 24200, revenue: 242000 }
  ];

  // Heatmap Data - Stop Utilization (Mock Data)
  const stopUtilization = [
    { stop: 'Amritsar Bus Stand', passengers: 2500, efficiency: 85 },
    { stop: 'Ludhiana Central', passengers: 3200, efficiency: 92 },
    { stop: 'Jalandhar City', passengers: 2800, efficiency: 78 },
    { stop: 'Patiala ISBT', passengers: 2200, efficiency: 88 },
    { stop: 'Bathinda Stand', passengers: 1800, efficiency: 75 },
    { stop: 'Mohali Phase 8', passengers: 2900, efficiency: 90 },
    { stop: 'Chandigarh ISBT', passengers: 3500, efficiency: 95 },
    { stop: 'Ferozepur Terminal', passengers: 1600, efficiency: 72 }
  ];

  const COLORS = ['#10B981', '#6B7280', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time insights</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Passengers</p>
              <p className="text-2xl font-bold">24.2K</p>
              <p className="text-blue-200 text-xs">+12% from last month</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Route Efficiency</p>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-green-200 text-xs">+5% improvement</p>
            </div>
            <Activity className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Revenue</p>
              <p className="text-2xl font-bold">₹2.4L</p>
              <p className="text-purple-200 text-xs">Monthly total</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg. Occupancy</p>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-orange-200 text-xs">Peak hours: 85%</p>
            </div>
            <MapPin className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Buses per Route */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buses per Route</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={busesPerRoute} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="routeNumber" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'buses' ? 'Total Buses' : 'Active Buses']}
                labelFormatter={(label) => {
                  const route = busesPerRoute.find(r => r.routeNumber === label);
                  return route ? route.routeName : label;
                }}
              />
              <Legend />
              <Bar dataKey="buses" fill="#3B82F6" name="Total Buses" />
              <Bar dataKey="activeBuses" fill="#10B981" name="Active Buses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Driver Status */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driverStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {driverStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Drivers']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {driverStatusData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart - Passenger Growth */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Growth Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={passengerTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'passengers' ? `${value.toLocaleString()} passengers` : `₹${value.toLocaleString()}`,
                  name === 'passengers' ? 'Passengers' : 'Revenue'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="passengers" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Passengers"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Stop Utilization Heatmap */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stop Utilization Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stopUtilization} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="stop" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'passengers' ? `${value.toLocaleString()} passengers` : `${value}% efficiency`,
                  name === 'passengers' ? 'Daily Passengers' : 'Efficiency'
                ]}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="passengers" 
                stackId="1" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.6}
                name="Daily Passengers"
              />
              <Area 
                type="monotone" 
                dataKey="efficiency" 
                stackId="2" 
                stroke="#F59E0B" 
                fill="#F59E0B" 
                fillOpacity={0.6}
                name="Efficiency %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Peak Performance</h4>
            <p className="text-sm text-blue-700">
              Route 101 (Amritsar-Ludhiana) shows highest passenger volume with 95% efficiency rating.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Growth Trend</h4>
            <p className="text-sm text-green-700">
              Passenger count increased by 12% this month, with consistent upward trajectory.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Optimization Opportunity</h4>
            <p className="text-sm text-orange-700">
              3 routes show below 75% efficiency - consider schedule adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;