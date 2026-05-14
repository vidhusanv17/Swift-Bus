export interface Bus {
  id: string;
  busNumber: string;
  busModel: string;
  routeId: string;
  driverId: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdated: Date;
  speed: number;
  heading: number;
}

export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  aadhaarNumber: string;
  drivingLicense: string;
  assignedBusId?: string;
  status: 'active' | 'inactive' | 'on-break';
}

export interface Route {
  id: string;
  routeNumber: string;
  name: string;
  startStop: string;
  endStop: string;
  color: string;
  status: 'active' | 'inactive';
  vehicleCount: number;
  stops: string[];
}

export interface Stop {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  routes: string[];
  amenities: string[];
}

export interface DashboardStats {
  totalActiveVehicles: number;
  totalStops: number;
  totalRoutes: number;
  totalDrivers: number;
}

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  emergencyLocation: string;
  busNumber: string;
  assistanceType: 'medical' | 'police' | 'fire' | 'mechanical' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'active' | 'resolved';
  resolvedAt?: Date;
  resolvedBy?: string;
  adminNotes?: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}