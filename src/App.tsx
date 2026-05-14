import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import SOSButton from './components/SOSButton';
import VoiceAssistant from './components/VoiceAssistant';
import BusNotificationSystem from './components/BusNotificationSystem';
import { mockBuses, mockDrivers, mockRoutes, mockStops } from './data/mockData';
import { Bus, Driver, Route, Stop, DashboardStats, SOSAlert } from './types';
import './i18n';

function App() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [stops, setStops] = useState<Stop[]>(mockStops);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const stats: DashboardStats = {
    totalActiveVehicles: buses.filter(bus => bus.status === 'active').length,
    totalStops: stops.length,
    totalRoutes: routes.length,
    totalDrivers: drivers.length,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const handleUpdateBus = (updatedBus: Bus) => {
    setBuses(buses.map(bus => bus.id === updatedBus.id ? updatedBus : bus));
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    setDrivers(drivers.map(driver => driver.id === updatedDriver.id ? updatedDriver : driver));
  };

  const handleUpdateRoute = (updatedRoute: Route) => {
    setRoutes(routes.map(route => route.id === updatedRoute.id ? updatedRoute : route));
  };

  const handleUpdateStop = (updatedStop: Stop) => {
    setStops(stops.map(stop => stop.id === updatedStop.id ? updatedStop : stop));
  };

  const handleAddBus = (newBus: Omit<Bus, 'id'>) => {
    const bus: Bus = {
      ...newBus,
      id: Date.now().toString(),
    };
    setBuses([...buses, bus]);
  };

  const handleAddDriver = (newDriver: Omit<Driver, 'id'>) => {
    const driver: Driver = {
      ...newDriver,
      id: Date.now().toString(),
    };
    setDrivers([...drivers, driver]);
  };

  const handleSOSAlert = (alertData: {
    latitude: number;
    longitude: number;
    emergencyLocation: string;
    busNumber: string;
    assistanceType: 'medical' | 'police' | 'fire' | 'mechanical' | 'other';
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    userName: string;
    phoneNumber: string;
  }) => {
    const alert: SOSAlert = {
      id: Date.now().toString(),
      userId: 'user-' + Date.now(),
      userName: alertData.userName,
      phoneNumber: alertData.phoneNumber,
      latitude: alertData.latitude,
      longitude: alertData.longitude,
      emergencyLocation: alertData.emergencyLocation,
      busNumber: alertData.busNumber,
      assistanceType: alertData.assistanceType,
      description: alertData.description,
      priority: alertData.priority,
      timestamp: new Date(),
      status: 'active'
    };
    setSosAlerts(prev => [alert, ...prev]); // Add new alert at the beginning
  };

  const handleResolveSOS = (alertId: string) => {
    setSosAlerts(sosAlerts.map(alert => 
      alert.id === alertId ? { 
        ...alert, 
        status: 'resolved' as const,
        resolvedAt: new Date(),
        resolvedBy: 'Admin User' // In real app, this would be the logged-in admin
      } : alert
    ));
  };
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Get user location for notifications
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          // Set a default location (Punjab, India) if geolocation fails
          setUserLocation({
            latitude: 30.7333,
            longitude: 76.7794
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 60000
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser');
      // Set a default location (Punjab, India) if geolocation is not supported
      setUserLocation({
        latitude: 30.7333,
        longitude: 76.7794
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={setIsMobileMenuOpen}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-auto">
        {/* Header */}
        <Header 
          lastUpdated={lastUpdated}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <MainContent
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            buses={buses}
            stops={stops}
            routes={routes}
            drivers={drivers}
            sosAlerts={sosAlerts}
            onUpdateBus={handleUpdateBus}
            onUpdateDriver={handleUpdateDriver}
            onUpdateRoute={handleUpdateRoute}
            onUpdateStop={handleUpdateStop}
            onAddBus={handleAddBus}
            onAddDriver={handleAddDriver}
            onResolveSOS={handleResolveSOS}
          />
          
          {/* Right Sidebar - Only show on map views */}
          {activeSection === 'home' && (
            <div className="w-full lg:w-80 bg-white shadow-lg h-auto lg:h-full overflow-y-auto order-first lg:order-last">
              <div className="p-4 space-y-4 lg:space-y-6">
                {/* Voice Assistant */}
                <VoiceAssistant />
                
                {/* Bus Notifications */}
                <BusNotificationSystem
                  buses={buses}
                  stops={stops}
                  userLocation={userLocation}
                />
                
                {/* Original Right Sidebar Content */}
                <div className="border-t pt-4 lg:pt-6">
                  <RightSidebar 
                    stats={stats}
                    routes={routes}
                    buses={buses}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* SOS Button - Only show on user sections */}
      {!activeSection.includes('admin') && (
        <SOSButton onSOSAlert={handleSOSAlert} />
      )}
    </div>
  );
}

export default App;