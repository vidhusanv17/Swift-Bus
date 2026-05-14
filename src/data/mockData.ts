import { Bus, Driver, Route, Stop } from '../types';

export const mockBuses: Bus[] = [
  {
    id: '1',
    busNumber: 'PB-01-AB-1234',
    busModel: 'Tata Starbus',
    routeId: '1',
    driverId: '1',
    latitude: 31.6340,
    longitude: 74.8723,
    status: 'active',
    lastUpdated: new Date(),
    speed: 35,
    heading: 90
  },
  {
    id: '2',
    busNumber: 'PB-02-CD-5678',
    busModel: 'Ashok Leyland Viking',
    routeId: '2',
    driverId: '2',
    latitude: 30.9010,
    longitude: 75.8573,
    status: 'active',
    lastUpdated: new Date(),
    speed: 28,
    heading: 180
  },
  {
    id: '3',
    busNumber: 'PB-03-EF-9012',
    busModel: 'Mahindra Tourister',
    routeId: '1',
    driverId: '3',
    latitude: 31.3260,
    longitude: 75.5762,
    status: 'active',
    lastUpdated: new Date(),
    speed: 42,
    heading: 270
  },
  {
    id: '4',
    busNumber: 'PB-04-GH-3456',
    busModel: 'Eicher Skyline',
    routeId: '3',
    driverId: '4',
    latitude: 30.3398,
    longitude: 76.3869,
    status: 'maintenance',
    lastUpdated: new Date(),
    speed: 0,
    heading: 0
  }
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ (Gurpreet Singh)',
    phoneNumber: '+91-9876543210',
    address: 'Village Khanna, District Ludhiana, Punjab',
    aadhaarNumber: '1234-5678-9012',
    drivingLicense: 'PB1234567890123',
    assignedBusId: '1',
    status: 'active'
  },
  {
    id: '2',
    name: 'ਹਰਜੀਤ ਕੌਰ (Harjeet Kaur)',
    phoneNumber: '+91-9876543211',
    address: 'Village Raikot, District Ludhiana, Punjab',
    aadhaarNumber: '2345-6789-0123',
    drivingLicense: 'PB2345678901234',
    assignedBusId: '2',
    status: 'active'
  },
  {
    id: '3',
    name: 'ਜਸਵਿੰਦਰ ਸਿੰਘ (Jaswinder Singh)',
    phoneNumber: '+91-9876543212',
    address: 'Village Samrala, District Ludhiana, Punjab',
    aadhaarNumber: '3456-7890-1234',
    drivingLicense: 'PB3456789012345',
    assignedBusId: '3',
    status: 'active'
  },
  {
    id: '4',
    name: 'ਸਿਮਰਨਜੀਤ ਕੌਰ (Simranjeet Kaur)',
    phoneNumber: '+91-9876543213',
    address: 'Village Doraha, District Ludhiana, Punjab',
    aadhaarNumber: '4567-8901-2345',
    drivingLicense: 'PB4567890123456',
    assignedBusId: '4',
    status: 'on-break'
  },
  {
    id: '5',
    name: 'ਅਮਰਜੀਤ ਸਿੰਘ (Amarjeet Singh)',
    phoneNumber: '+91-9876543214',
    address: 'Village Phagwara, District Kapurthala, Punjab',
    aadhaarNumber: '5678-9012-3456',
    drivingLicense: 'PB5678901234567',
    assignedBusId: '5',
    status: 'active'
  },
  {
    id: '6',
    name: 'ਸੁਖਵਿੰਦਰ ਕੌਰ (Sukhwinder Kaur)',
    phoneNumber: '+91-9876543215',
    address: 'Village Mohali, District Mohali, Punjab',
    aadhaarNumber: '6789-0123-4567',
    drivingLicense: 'PB6789012345678',
    assignedBusId: '6',
    status: 'active'
  },
  {
    id: '7',
    name: 'ਰਾਜਿੰਦਰ ਸਿੰਘ (Rajinder Singh)',
    phoneNumber: '+91-9876543216',
    address: 'Village Bathinda, District Bathinda, Punjab',
    aadhaarNumber: '7890-1234-5678',
    drivingLicense: 'PB7890123456789',
    assignedBusId: '7',
    status: 'active'
  },
  {
    id: '8',
    name: 'ਮਨਪ੍ਰੀਤ ਕੌਰ (Manpreet Kaur)',
    phoneNumber: '+91-9876543217',
    address: 'Village Hoshiarpur, District Hoshiarpur, Punjab',
    aadhaarNumber: '8901-2345-6789',
    drivingLicense: 'PB8901234567890',
    assignedBusId: '8',
    status: 'inactive'
  },
  {
    id: '9',
    name: 'ਬਲਜੀਤ ਸਿੰਘ (Baljeet Singh)',
    phoneNumber: '+91-9876543218',
    address: 'Village Rajpura, District Patiala, Punjab',
    aadhaarNumber: '9012-3456-7890',
    drivingLicense: 'PB9012345678901',
    assignedBusId: '9',
    status: 'active'
  },
  {
    id: '10',
    name: 'ਸਰਬਜੀਤ ਕੌਰ (Sarbjeet Kaur)',
    phoneNumber: '+91-9876543219',
    address: 'Village Faridkot, District Faridkot, Punjab',
    aadhaarNumber: '0123-4567-8901',
    drivingLicense: 'PB0123456789012',
    assignedBusId: '10',
    status: 'on-break'
  }
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    routeNumber: '101',
    name: 'Amritsar - Ludhiana Express',
    startStop: 'Amritsar Bus Stand',
    endStop: 'Ludhiana Central Bus Terminal',
    color: '#3B82F6',
    status: 'active',
    vehicleCount: 2,
    stops: ['1', '2', '3', '4', '5']
  },
  {
    id: '2',
    routeNumber: '202',
    name: 'Jalandhar - Patiala Route',
    startStop: 'Jalandhar City Bus Stand',
    endStop: 'Patiala Inter State Bus Terminal',
    color: '#10B981',
    status: 'active',
    vehicleCount: 1,
    stops: ['6', '7', '8', '9', '10']
  },
  {
    id: '3',
    routeNumber: '303',
    name: 'Bathinda - Mohali Connect',
    startStop: 'Bathinda Bus Stand',
    endStop: 'Mohali Phase 8 Terminal',
    color: '#F59E0B',
    status: 'active',
    vehicleCount: 1,
    stops: ['11', '12', '13', '14', '15']
  },
  {
    id: '4',
    routeNumber: '404',
    name: 'Chandigarh - Ferozepur Highway',
    startStop: 'Chandigarh ISBT Sector 43',
    endStop: 'Ferozepur Bus Terminal',
    color: '#8B5CF6',
    status: 'active',
    vehicleCount: 2,
    stops: ['16', '17', '18', '19', '20']
  },
  {
    id: '5',
    routeNumber: '505',
    name: 'Gurdaspur - Barnala Express',
    startStop: 'Gurdaspur Bus Stand',
    endStop: 'Barnala Central Terminal',
    color: '#EF4444',
    status: 'active',
    vehicleCount: 1,
    stops: ['21', '22', '23', '24', '25']
  },
  {
    id: '6',
    routeNumber: '606',
    name: 'Hoshiarpur - Mansa Rural Link',
    startStop: 'Hoshiarpur Bus Stand',
    endStop: 'Mansa District Terminal',
    color: '#06B6D4',
    status: 'active',
    vehicleCount: 1,
    stops: ['26', '27', '28', '29', '30']
  },
  {
    id: '7',
    routeNumber: '707',
    name: 'Kapurthala - Sangrur Circuit',
    startStop: 'Kapurthala Railway Station',
    endStop: 'Sangrur Bus Terminal',
    color: '#F97316',
    status: 'inactive',
    vehicleCount: 0,
    stops: ['31', '32', '33', '34', '35']
  },
  {
    id: '8',
    routeNumber: '808',
    name: 'Faridkot - Muktsar Village Route',
    startStop: 'Faridkot Bus Stand',
    endStop: 'Muktsar Sahib Terminal',
    color: '#84CC16',
    status: 'active',
    vehicleCount: 1,
    stops: ['36', '37', '38', '39', '40']
  }
];

export const mockStops: Stop[] = [
  {
    id: '1',
    name: 'Amritsar Bus Stand',
    code: 'ABS001',
    latitude: 31.6340,
    longitude: 74.8723,
    routes: ['1'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Gurudwara Nearby']
  },
  {
    id: '2',
    name: 'Tarn Taran Junction',
    code: 'TTJ002',
    latitude: 31.4515,
    longitude: 74.9289,
    routes: ['1'],
    amenities: ['Shelter', 'Seating', 'Tea Stall']
  },
  {
    id: '3',
    name: 'Goindwal Sahib',
    code: 'GS003',
    latitude: 31.3219,
    longitude: 75.1619,
    routes: ['1'],
    amenities: ['Shelter', 'Gurudwara', 'Langar Hall']
  },
  {
    id: '4',
    name: 'Khadoor Sahib',
    code: 'KS004',
    latitude: 31.2718,
    longitude: 75.2718,
    routes: ['1'],
    amenities: ['Shelter', 'Seating', 'Historical Site']
  },
  {
    id: '5',
    name: 'Ludhiana Central Bus Terminal',
    code: 'LCBT005',
    latitude: 30.9010,
    longitude: 75.8573,
    routes: ['1'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Food Court', 'WiFi']
  },
  {
    id: '6',
    name: 'Jalandhar City Bus Stand',
    code: 'JCBS006',
    latitude: 31.3260,
    longitude: 75.5762,
    routes: ['2'],
    amenities: ['Shelter', 'Seating', 'Digital Display']
  },
  {
    id: '7',
    name: 'Kapurthala',
    code: 'KPT007',
    latitude: 31.3800,
    longitude: 75.3800,
    routes: ['2'],
    amenities: ['Shelter', 'Seating', 'Palace View']
  },
  {
    id: '8',
    name: 'Sultanpur Lodhi',
    code: 'SL008',
    latitude: 31.2254,
    longitude: 75.2044,
    routes: ['2'],
    amenities: ['Shelter', 'Gurudwara', 'Historical Site']
  },
  {
    id: '9',
    name: 'Fatehgarh Sahib',
    code: 'FS009',
    latitude: 30.6446,
    longitude: 76.3969,
    routes: ['2'],
    amenities: ['Shelter', 'Seating', 'Gurudwara']
  },
  {
    id: '10',
    name: 'Patiala Inter State Bus Terminal',
    code: 'PISBT010',
    latitude: 30.3398,
    longitude: 76.3869,
    routes: ['2'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Food Court', 'WiFi']
  },
  {
    id: '11',
    name: 'Bathinda Bus Stand',
    code: 'BBS011',
    latitude: 30.2118,
    longitude: 74.9455,
    routes: ['3'],
    amenities: ['Shelter', 'Seating', 'Fort View']
  },
  {
    id: '12',
    name: 'Mansa',
    code: 'MNS012',
    latitude: 29.9988,
    longitude: 75.3933,
    routes: ['3'],
    amenities: ['Shelter', 'Rural Market']
  },
  {
    id: '13',
    name: 'Sangrur',
    code: 'SGR013',
    latitude: 30.2459,
    longitude: 75.8421,
    routes: ['3'],
    amenities: ['Shelter', 'Seating', 'Agricultural Hub']
  },
  {
    id: '14',
    name: 'Rajpura',
    code: 'RJP014',
    latitude: 30.4821,
    longitude: 76.5944,
    routes: ['3'],
    amenities: ['Shelter', 'Seating', 'Railway Junction']
  },
  {
    id: '15',
    name: 'Mohali Phase 8 Terminal',
    code: 'MP8T015',
    latitude: 30.7046,
    longitude: 76.7179,
    routes: ['3'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'IT Hub', 'WiFi']
  },
  // Additional stops for new routes
  {
    id: '16',
    name: 'Chandigarh ISBT Sector 43',
    code: 'CHISBT016',
    latitude: 30.7333,
    longitude: 76.7794,
    routes: ['4'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Food Court', 'WiFi', 'ATM']
  },
  {
    id: '17',
    name: 'Ropar Junction',
    code: 'RPR017',
    latitude: 30.9697,
    longitude: 76.5197,
    routes: ['4'],
    amenities: ['Shelter', 'Seating', 'Historical Site']
  },
  {
    id: '18',
    name: 'Ludhiana West',
    code: 'LDW018',
    latitude: 30.8800,
    longitude: 75.8100,
    routes: ['4'],
    amenities: ['Shelter', 'Industrial Area']
  },
  {
    id: '19',
    name: 'Firozpur Cantt',
    code: 'FZC019',
    latitude: 30.9320,
    longitude: 74.6150,
    routes: ['4'],
    amenities: ['Shelter', 'Military Area', 'Canteen']
  },
  {
    id: '20',
    name: 'Ferozepur Bus Terminal',
    code: 'FZBT020',
    latitude: 30.9180,
    longitude: 74.6020,
    routes: ['4'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Border Area']
  },
  {
    id: '21',
    name: 'Gurdaspur Bus Stand',
    code: 'GDS021',
    latitude: 32.0409,
    longitude: 75.4065,
    routes: ['5'],
    amenities: ['Shelter', 'Seating', 'Border Town']
  },
  {
    id: '22',
    name: 'Batala Junction',
    code: 'BTL022',
    latitude: 31.8186,
    longitude: 75.2045,
    routes: ['5'],
    amenities: ['Shelter', 'Railway Connection']
  },
  {
    id: '23',
    name: 'Tarn Taran Central',
    code: 'TTC023',
    latitude: 31.4515,
    longitude: 74.9289,
    routes: ['5'],
    amenities: ['Shelter', 'Gurudwara', 'Holy Tank']
  },
  {
    id: '24',
    name: 'Sunam City',
    code: 'SNM024',
    latitude: 30.1281,
    longitude: 75.7981,
    routes: ['5'],
    amenities: ['Shelter', 'Rural Market']
  },
  {
    id: '25',
    name: 'Barnala Central Terminal',
    code: 'BCT025',
    latitude: 30.3742,
    longitude: 75.5462,
    routes: ['5'],
    amenities: ['Shelter', 'Seating', 'Digital Display', 'Cotton Market']
  },
  {
    id: '26',
    name: 'Hoshiarpur Bus Stand',
    code: 'HBS026',
    latitude: 31.5344,
    longitude: 75.9119,
    routes: ['6'],
    amenities: ['Shelter', 'Seating', 'Hill Station']
  },
  {
    id: '27',
    name: 'Dasuya Market',
    code: 'DSM027',
    latitude: 31.8167,
    longitude: 75.6500,
    routes: ['6'],
    amenities: ['Shelter', 'Local Market']
  },
  {
    id: '28',
    name: 'Malout Junction',
    code: 'MLT028',
    latitude: 30.2073,
    longitude: 74.4951,
    routes: ['6'],
    amenities: ['Shelter', 'Railway Station']
  },
  {
    id: '29',
    name: 'Budhlada',
    code: 'BDL029',
    latitude: 30.1833,
    longitude: 75.5667,
    routes: ['6'],
    amenities: ['Shelter', 'Rural Hub']
  },
  {
    id: '30',
    name: 'Mansa District Terminal',
    code: 'MDT030',
    latitude: 29.9988,
    longitude: 75.3933,
    routes: ['6'],
    amenities: ['Shelter', 'Seating', 'District Headquarters']
  },
  {
    id: '31',
    name: 'Kapurthala Railway Station',
    code: 'KRS031',
    latitude: 31.3800,
    longitude: 75.3800,
    routes: ['7'],
    amenities: ['Shelter', 'Railway Connection', 'Palace View']
  },
  {
    id: '32',
    name: 'Phagwara Industrial',
    code: 'PHI032',
    latitude: 31.2244,
    longitude: 75.7729,
    routes: ['7'],
    amenities: ['Shelter', 'Industrial Area']
  },
  {
    id: '33',
    name: 'Khanna Junction',
    code: 'KHJ033',
    latitude: 30.7058,
    longitude: 76.2219,
    routes: ['7'],
    amenities: ['Shelter', 'Railway Junction']
  },
  {
    id: '34',
    name: 'Dhuri Market',
    code: 'DHM034',
    latitude: 30.3667,
    longitude: 75.8667,
    routes: ['7'],
    amenities: ['Shelter', 'Agricultural Market']
  },
  {
    id: '35',
    name: 'Sangrur Bus Terminal',
    code: 'SBT035',
    latitude: 30.2459,
    longitude: 75.8421,
    routes: ['7'],
    amenities: ['Shelter', 'Seating', 'District Center']
  },
  {
    id: '36',
    name: 'Faridkot Bus Stand',
    code: 'FBS036',
    latitude: 30.6704,
    longitude: 74.7556,
    routes: ['8'],
    amenities: ['Shelter', 'Seating', 'Historical Fort']
  },
  {
    id: '37',
    name: 'Kotkapura',
    code: 'KTK037',
    latitude: 30.5820,
    longitude: 74.8330,
    routes: ['8'],
    amenities: ['Shelter', 'Gurudwara', 'Market']
  },
  {
    id: '38',
    name: 'Giddarbaha',
    code: 'GDB038',
    latitude: 30.2073,
    longitude: 74.6651,
    routes: ['8'],
    amenities: ['Shelter', 'Rural Center']
  },
  {
    id: '39',
    name: 'Mallanwala',
    code: 'MLW039',
    latitude: 30.1500,
    longitude: 74.3000,
    routes: ['8'],
    amenities: ['Shelter', 'Village Hub']
  },
  {
    id: '40',
    name: 'Muktsar Sahib Terminal',
    code: 'MST040',
    latitude: 30.4762,
    longitude: 74.5133,
    routes: ['8'],
    amenities: ['Shelter', 'Seating', 'Gurudwara', 'Historical Site']
  }
];