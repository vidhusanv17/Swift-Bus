import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bus, Driver, SOSAlert, Stop, Route } from '../types';
import { Plus, CreditCard as Edit2, Trash2, Save, X, AlertTriangle, MapPin, Phone, Activity, Navigation, Users, Clock } from 'lucide-react';
import AnalyticsSection from './AnalyticsSection';

interface AdminPanelProps {
  buses: Bus[];
  drivers: Driver[];
  routes: Route[];
  stops: Stop[];
  sosAlerts: SOSAlert[];
  onAddBus: (bus: Omit<Bus, 'id'>) => void;
  onAddDriver: (driver: Omit<Driver, 'id'>) => void;
  onUpdateBus: (bus: Bus) => void;
  onUpdateDriver: (driver: Driver) => void;
  onResolveSOS: (alertId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  buses,
  drivers,
  routes,
  stops,
  sosAlerts,
  onAddBus,
  onAddDriver,
  onUpdateBus,
  onUpdateDriver,
  onResolveSOS,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'active' | 'analytics' | 'buses' | 'drivers' | 'sos'>('active');
  const [showBusForm, setShowBusForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const [busForm, setBusForm] = useState({
    busNumber: '',
    busModel: '',
    routeId: '1',
    driverId: '',
    latitude: 30.9010,
    longitude: 75.8573,
    status: 'inactive' as const,
    speed: 0,
    heading: 0
  });

  const [driverForm, setDriverForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    aadhaarNumber: '',
    drivingLicense: '',
    status: 'inactive' as const
  });

  const handleAddBus = () => {
    onAddBus({
      ...busForm,
      lastUpdated: new Date()
    });
    setBusForm({
      busNumber: '',
      busModel: '',
      routeId: '1',
      driverId: '',
      latitude: 30.9010,
      longitude: 75.8573,
      status: 'inactive',
      speed: 0,
      heading: 0
    });
    setShowBusForm(false);
  };

  const handleAddDriver = () => {
    onAddDriver(driverForm);
    setDriverForm({
      name: '',
      phoneNumber: '',
      address: '',
      aadhaarNumber: '',
      drivingLicense: '',
      status: 'inactive'
    });
    setShowDriverForm(false);
  };

  const handleEditBus = (bus: Bus) => {
    setEditingBus(bus);
    setBusForm({
      busNumber: bus.busNumber,
      busModel: bus.busModel,
      routeId: bus.routeId,
      driverId: bus.driverId,
      latitude: bus.latitude,
      longitude: bus.longitude,
      status: bus.status,
      speed: bus.speed,
      heading: bus.heading
    });
  };

  const handleUpdateBus = () => {
    if (editingBus) {
      onUpdateBus({
        ...editingBus,
        ...busForm,
        lastUpdated: new Date()
      });
      setEditingBus(null);
      setBusForm({
        busNumber: '',
        busModel: '',
        routeId: '1',
        driverId: '',
        latitude: 30.9010,
        longitude: 75.8573,
        status: 'inactive',
        speed: 0,
        heading: 0
      });
    }
  };

  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setDriverForm({
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      address: driver.address,
      aadhaarNumber: driver.aadhaarNumber,
      drivingLicense: driver.drivingLicense,
      status: driver.status
    });
  };

  const handleUpdateDriver = () => {
    if (editingDriver) {
      onUpdateDriver({
        ...editingDriver,
        ...driverForm
      });
      setEditingDriver(null);
      setDriverForm({
        name: '',
        phoneNumber: '',
        address: '',
        aadhaarNumber: '',
        drivingLicense: '',
        status: 'inactive'
      });
    }
  };

  const handleAddAdminNotes = (alertId: string, notes: string) => {
    // This function would need to be passed as a prop or handled differently
    // For now, we'll just log it
    console.log(`Adding notes to alert ${alertId}: ${notes}`);
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
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAssistanceTypeColor = (type: string) => {
    switch (type) {
      case 'medical': return 'bg-red-100 text-red-800';
      case 'police': return 'bg-blue-100 text-blue-800';
      case 'fire': return 'bg-orange-100 text-orange-800';
      case 'mechanical': return 'bg-gray-100 text-gray-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  const renderActiveSection = () => (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Routes</p>
              <p className="text-3xl font-bold">{routes.length}</p>
              <p className="text-blue-200 text-xs mt-1">
                {routes.filter(r => r.status === 'active').length} active
              </p>
            </div>
            <Navigation className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Buses</p>
              <p className="text-3xl font-bold">{buses.length}</p>
              <p className="text-green-200 text-xs mt-1">
                {buses.filter(b => b.status === 'active').length} active
              </p>
            </div>
            <Activity className="w-10 h-10 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Drivers</p>
              <p className="text-3xl font-bold">{drivers.length}</p>
              <p className="text-purple-200 text-xs mt-1">
                {drivers.filter(d => d.status === 'active').length} active
              </p>
            </div>
            <Users className="w-10 h-10 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Bus Stops</p>
              <p className="text-3xl font-bold">{stops.length}</p>
              <p className="text-orange-200 text-xs mt-1">
                Across Punjab
              </p>
            </div>
            <MapPin className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* SOS Alerts */}
      {sosAlerts.filter(alert => alert.status === 'active').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            🚨 Active Emergency Alerts ({sosAlerts.filter(alert => alert.status === 'active').length})
          </h3>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {sosAlerts.filter(alert => alert.status === 'active').map((alert) => (
              <div key={alert.id} className="bg-white p-4 rounded-lg border border-red-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getAssistanceIcon(alert.assistanceType)}</span>
                      <h4 className="font-semibold text-gray-900">{alert.userName}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {alert.phoneNumber}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {alert.emergencyLocation}
                      </p>
                      {alert.busNumber && (
                        <p className="flex items-center">
                          <span className="w-4 h-4 mr-1">🚌</span>
                          Bus: {alert.busNumber}
                        </p>
                      )}
                      <p className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${getAssistanceTypeColor(alert.assistanceType)}`}>
                          {alert.assistanceType.charAt(0).toUpperCase() + alert.assistanceType.slice(1)}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Description:</strong> {alert.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Reported: {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        // Focus on map location
                        window.dispatchEvent(new CustomEvent('focusSOSAlert', { 
                          detail: { alert } 
                        }));
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => onResolveSOS(alert.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Resolved SOS Alerts */}
      {sosAlerts.filter(alert => alert.status === 'resolved').length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <span className="w-5 h-5 mr-2">✅</span>
            Recently Resolved Emergencies ({sosAlerts.filter(alert => alert.status === 'resolved').length})
          </h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {sosAlerts.filter(alert => alert.status === 'resolved').slice(0, 5).map((alert) => (
              <div key={alert.id} className="bg-white p-3 rounded border border-green-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm">{getAssistanceIcon(alert.assistanceType)}</span>
                      <p className="font-medium text-gray-900 text-sm">{alert.userName}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Resolved
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {alert.emergencyLocation} • {alert.assistanceType}
                    </p>
                    <p className="text-xs text-gray-500">
                      Resolved: {alert.resolvedAt?.toLocaleString()} by {alert.resolvedBy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Active Alerts */}
      {sosAlerts.filter(alert => alert.status === 'active').length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">All Clear!</h3>
          <p className="text-green-700">No active emergency alerts at this time.</p>
        </div>
      )}

      {/* Active Buses and Drivers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Buses</h3>
          <div className="space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
            {buses.filter(bus => bus.status === 'active').map((bus) => (
              <div key={bus.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{bus.busNumber}</p>
                    <p className="text-sm text-gray-600">{bus.busModel}</p>
                    <p className="text-sm text-gray-600">{t('route')}: {bus.routeId}</p>
                    <p className="text-sm text-gray-600">{t('speed')}: {bus.speed} km/h</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {t('active')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Drivers</h3>
          <div className="space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
            {drivers.filter(driver => driver.status === 'active').map((driver) => (
              <div key={driver.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base line-clamp-1">{driver.name}</p>
                    <p className="text-sm text-gray-600 break-all">{driver.phoneNumber}</p>
                    <p className="text-sm text-gray-600">
                      {t('assignedBus')}: {
                        driver.assignedBusId 
                          ? buses.find(b => b.id === driver.assignedBusId)?.busNumber || 'Unknown'
                          : 'Unassigned'
                      }
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {t('active')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('recentActivity')}</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Bus PB-01-AB-1234 {t('busStartedRoute')} 101</span>
            <span className="text-xs text-gray-500 ml-auto">2 {t('minutesAgo')}</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ {t('driverCheckedIn')}</span>
            <span className="text-xs text-gray-500 ml-auto">5 {t('minutesAgo')}</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Route 303 {t('routeUpdated')}</span>
            <span className="text-xs text-gray-500 ml-auto">10 {t('minutesAgo')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('buses')}</h2>
        <button
          onClick={() => setShowBusForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('addBus')}
        </button>
      </div>

      {/* Bus Form */}
      {(showBusForm || editingBus) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingBus ? 'Edit Bus' : t('addBus')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('busNumber')}
              </label>
              <input
                type="text"
                value={busForm.busNumber}
                onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PB-01-AB-1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('busModel')}
              </label>
              <input
                type="text"
                value={busForm.busModel}
                onChange={(e) => setBusForm({ ...busForm, busModel: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tata Starbus"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={editingBus ? handleUpdateBus : handleAddBus}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {t('save')}
            </button>
            <button
              onClick={() => {
                setShowBusForm(false);
                setEditingBus(null);
                setBusForm({
                  busNumber: '',
                  busModel: '',
                  routeId: '1',
                  driverId: '',
                  latitude: 30.9010,
                  longitude: 75.8573,
                  status: 'inactive',
                  speed: 0,
                  heading: 0
                });
              }}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Buses List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('busNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('route')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bus.busNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bus.busModel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bus.routeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bus.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : bus.status === 'maintenance'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {t(bus.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditBus(bus)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDriversSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('drivers')}</h2>
        <button
          onClick={() => setShowDriverForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('addDriver')}
        </button>
      </div>

      {/* Driver Form */}
      {(showDriverForm || editingDriver) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingDriver ? 'Edit Driver' : t('addDriver')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                value={driverForm.name}
                onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ (Gurpreet Singh)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                value={driverForm.phoneNumber}
                onChange={(e) => setDriverForm({ ...driverForm, phoneNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91-9876543210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')}
              </label>
              <textarea
                value={driverForm.address}
                onChange={(e) => setDriverForm({ ...driverForm, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="Village Khanna, District Ludhiana, Punjab"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('aadhaarNumber')}
              </label>
              <input
                type="text"
                value={driverForm.aadhaarNumber}
                onChange={(e) => setDriverForm({ ...driverForm, aadhaarNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234-5678-9012"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('drivingLicense')}
              </label>
              <input
                type="text"
                value={driverForm.drivingLicense}
                onChange={(e) => setDriverForm({ ...driverForm, drivingLicense: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PB1234567890123"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={editingDriver ? handleUpdateDriver : handleAddDriver}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {t('save')}
            </button>
            <button
              onClick={() => {
                setShowDriverForm(false);
                setEditingDriver(null);
                setDriverForm({
                  name: '',
                  phoneNumber: '',
                  address: '',
                  aadhaarNumber: '',
                  drivingLicense: '',
                  status: 'inactive'
                });
              }}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Drivers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('phoneNumber')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {driver.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {driver.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {driver.drivingLicense}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      driver.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : driver.status === 'on-break'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {t(driver.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditDriver(driver)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6">
      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex flex-wrap gap-2 lg:space-x-8 lg:gap-0">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-3 lg:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('activeSection')}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-3 lg:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('buses')}
            className={`py-2 px-3 lg:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'buses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('buses')}
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`py-2 px-3 lg:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'drivers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('drivers')}
          </button>
          <button
            onClick={() => setActiveTab('sos')}
            className={`py-2 px-3 lg:px-1 border-b-2 font-medium text-sm relative whitespace-nowrap ${
              activeTab === 'sos'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SOS Alerts
            {sosAlerts.filter(alert => alert.status === 'active').length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && renderActiveSection()}
      {activeTab === 'analytics' && (
        <AnalyticsSection 
          buses={buses} 
          drivers={drivers} 
          routes={routes} 
        />
      )}
      {activeTab === 'buses' && renderBusesSection()}
      {activeTab === 'drivers' && renderDriversSection()}
      {activeTab === 'sos' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">🚨 Emergency Management Center</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600">
                  {sosAlerts.filter(alert => alert.status === 'active').length} Active Alerts
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">
                  {sosAlerts.filter(alert => alert.status === 'resolved').length} Resolved
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚑</span>
                <div>
                  <p className="text-sm text-red-600 font-medium">Medical</p>
                  <p className="text-xl font-bold text-red-900">
                    {sosAlerts.filter(a => a.assistanceType === 'medical' && a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚔</span>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Police</p>
                  <p className="text-xl font-bold text-blue-900">
                    {sosAlerts.filter(a => a.assistanceType === 'police' && a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🚒</span>
                <div>
                  <p className="text-sm text-orange-600 font-medium">Fire</p>
                  <p className="text-xl font-bold text-orange-900">
                    {sosAlerts.filter(a => a.assistanceType === 'fire' && a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Mechanical</p>
                  <p className="text-xl font-bold text-gray-900">
                    {sosAlerts.filter(a => a.assistanceType === 'mechanical' && a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Emergencies */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-600 text-white p-4">
              <h3 className="text-lg font-semibold flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Active Emergency Alerts
                {sosAlerts.filter(alert => alert.status === 'active').length > 0 && (
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {sosAlerts.filter(alert => alert.status === 'active').length}
                  </span>
                )}
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {sosAlerts.filter(alert => alert.status === 'active').length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">All Clear!</h3>
                  <p className="text-green-700">No active emergency alerts at this time.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {sosAlerts
                    .filter(alert => alert.status === 'active')
                    .sort((a, b) => {
                      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                      return priorityOrder[b.priority] - priorityOrder[a.priority];
                    })
                    .map((alert) => (
                    <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{getAssistanceIcon(alert.assistanceType)}</span>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{alert.userName}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(alert.priority)}`}>
                                  {alert.priority.toUpperCase()} PRIORITY
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${getAssistanceTypeColor(alert.assistanceType)}`}>
                                  {alert.assistanceType.charAt(0).toUpperCase() + alert.assistanceType.slice(1)} Emergency
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <p className="flex items-center text-sm text-gray-600">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                <strong>Phone:</strong> <span className="ml-1">{alert.phoneNumber}</span>
                              </p>
                              <p className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                <strong>Location:</strong> <span className="ml-1">{alert.emergencyLocation}</span>
                              </p>
                              {alert.busNumber && (
                                <p className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">🚌</span>
                                  <strong>Bus:</strong> <span className="ml-1">{alert.busNumber}</span>
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <p className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                <strong>Reported:</strong> <span className="ml-1">{alert.timestamp.toLocaleString()}</span>
                              </p>
                              {alert.latitude !== 0 && alert.longitude !== 0 && (
                                <p className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                  <strong>GPS:</strong> <span className="ml-1">{alert.latitude.toFixed(6)}, {alert.longitude.toFixed(6)}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-700">
                              <strong>Emergency Description:</strong>
                            </p>
                            <p className="text-sm text-gray-800 mt-1">{alert.description}</p>
                          </div>
                          
                          {alert.adminNotes && (
                            <div className="bg-blue-50 rounded-lg p-3 mb-4">
                              <p className="text-sm text-blue-700">
                                <strong>Admin Notes:</strong>
                              </p>
                              <p className="text-sm text-blue-800 mt-1">{alert.adminNotes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-6 flex flex-col space-y-2">
                          <button
                            onClick={() => {
                              if (alert.latitude !== 0 && alert.longitude !== 0) {
                                // Switch to home section first
                                setActiveTab('active');
                                setTimeout(() => {
                                  window.dispatchEvent(new CustomEvent('focusSOSAlert', { 
                                    detail: { alert } 
                                  }));
                                }, 100);
                              } else {
                                alert('GPS location not available for this emergency. Location: ' + alert.emergencyLocation);
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            View on Map
                          </button>
                          <button
                            onClick={() => {
                              const notes = prompt('Add admin notes (optional):');
                              if (notes) {
                                handleAddAdminNotes(alert.id, notes);
                              }
                            }}
                            className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                          >
                            Add Notes
                          </button>
                          <button
                            onClick={() => onResolveSOS(alert.id)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recently Resolved Emergencies */}
          {sosAlerts.filter(alert => alert.status === 'resolved').length > 0 && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="w-5 h-5 mr-2">✅</span>
                  Recently Resolved Emergencies
                  <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    {sosAlerts.filter(alert => alert.status === 'resolved').length}
                  </span>
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="divide-y divide-gray-200">
                  {sosAlerts
                    .filter(alert => alert.status === 'resolved')
                    .sort((a, b) => (b.resolvedAt?.getTime() || 0) - (a.resolvedAt?.getTime() || 0))
                    .slice(0, 10)
                    .map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-lg">{getAssistanceIcon(alert.assistanceType)}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{alert.userName}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Resolved
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${getAssistanceTypeColor(alert.assistanceType)}`}>
                                  {alert.assistanceType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Location:</strong> {alert.emergencyLocation}</p>
                            <p><strong>Resolved:</strong> {alert.resolvedAt?.toLocaleString()} by {alert.resolvedBy}</p>
                            {alert.adminNotes && (
                              <p><strong>Notes:</strong> {alert.adminNotes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;