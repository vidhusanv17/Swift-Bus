import React from 'react';
import MapComponent from './Map';
import { Bus, Stop, Route, Driver, SOSAlert } from '../types';
import AdminPanel from './AdminPanel';
import RoutesList from './RoutesList';
import StopsList from './StopsList';
import ScheduleView from './ScheduleView';

interface MainContentProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  buses: Bus[];
  stops: Stop[];
  routes: Route[];
  drivers: Driver[];
  sosAlerts: SOSAlert[];
  onUpdateBus: (bus: Bus) => void;
  onUpdateDriver: (driver: Driver) => void;
  onUpdateRoute: (route: Route) => void;
  onUpdateStop: (stop: Stop) => void;
  onAddBus: (bus: Omit<Bus, 'id'>) => void;
  onAddDriver: (driver: Omit<Driver, 'id'>) => void;
  onResolveSOS: (alertId: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeSection,
  onSectionChange,
  buses,
  stops,
  routes,
  drivers,
  sosAlerts,
  onUpdateBus,
  onUpdateDriver,
  onUpdateRoute,
  onUpdateStop,
  onAddBus,
  onAddDriver,
  onResolveSOS,
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="h-64 sm:h-96 lg:h-full">
            <MapComponent buses={buses} stops={stops} sosAlerts={sosAlerts} />
          </div>
        );
      
      case 'routes':
        return (
          <div className="overflow-y-auto">
            <RoutesList 
            routes={routes} 
            stops={stops}
            buses={buses}
            onSectionChange={onSectionChange}
            onViewRouteOnMap={(routeId) => {
              // This will be handled by the Map component
              console.log('Viewing route on map:', routeId);
            }}
          />
          </div>
        );
      
      case 'stops':
        return (
          <div className="overflow-y-auto">
            <StopsList 
            stops={stops} 
            routes={routes}
            buses={buses}
            onSectionChange={onSectionChange}
            onViewOnMap={(stopId) => {
              console.log('Viewing stop on map:', stopId);
            }} 
          />
          </div>
        );
      
      case 'schedule':
        return (
          <div className="overflow-y-auto">
            <ScheduleView routes={routes} />
          </div>
        );
      
      case 'admin-panel':
        return (
          <div className="overflow-y-auto">
            <AdminPanel
            buses={buses}
            drivers={drivers}
            routes={routes}
            stops={stops}
            sosAlerts={sosAlerts}
            onAddBus={onAddBus}
            onAddDriver={onAddDriver}
            onUpdateBus={onUpdateBus}
            onUpdateDriver={onUpdateDriver}
            onResolveSOS={onResolveSOS}
            onSectionChange={onSectionChange}
          />
          </div>
        );
      
      default:
        return (
          <div className="h-64 sm:h-96 lg:h-full">
            <MapComponent buses={buses} stops={stops} sosAlerts={sosAlerts} />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden min-h-0">
      {renderContent()}
    </div>
  );
};

export default MainContent;