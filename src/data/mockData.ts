import { Hotspot, Ward, Alert, RainfallData } from '@/types';

// Rohini Ward Boundaries (realistic polygon shape)
export const ROHINI_WARD_BOUNDARY = [
  [28.7650, 77.0650], // Northwest point
  [28.7680, 77.0850], // North
  [28.7700, 77.1050], // Northeast
  [28.7550, 77.1200], // East
  [28.7350, 77.1250], // Southeast
  [28.7100, 77.1150], // South-Southeast
  [28.6950, 77.1050], // South
  [28.6900, 77.0850], // Southwest
  [28.7000, 77.0700], // West-Southwest
  [28.7200, 77.0650], // West
  [28.7400, 77.0600], // Northwest-West
  [28.7650, 77.0650], // Close the polygon
];

export const ROHINI_CENTER: [number, number] = [28.7250, 77.1000];

// Delhi city center for Super Admin city-wide view
export const DELHI_CENTER: [number, number] = [28.6139, 77.2090];

// Ward boundaries for city-wide map (simplified polygons for each ward)
export const WARD_BOUNDARIES: Record<string, [number, number][]> = {
  'Rohini': ROHINI_WARD_BOUNDARY,
  'Dwarka': [
    [28.6200, 77.0200],
    [28.6250, 77.0600],
    [28.6000, 77.0700],
    [28.5700, 77.0500],
    [28.5650, 77.0200],
    [28.6200, 77.0200],
  ],
  'Karol Bagh': [
    [28.6700, 77.1700],
    [28.6750, 77.2050],
    [28.6400, 77.2100],
    [28.6300, 77.1800],
    [28.6700, 77.1700],
  ],
  'Shahdara': [
    [28.7000, 77.2650],
    [28.7050, 77.3000],
    [28.6700, 77.3050],
    [28.6600, 77.2700],
    [28.7000, 77.2650],
  ],
  'Najafgarh': [
    [28.6300, 76.9600],
    [28.6350, 76.9950],
    [28.6000, 77.0000],
    [28.5850, 76.9650],
    [28.6300, 76.9600],
  ],
  'Janakpuri': [
    [28.6400, 77.0650],
    [28.6450, 77.1000],
    [28.6100, 77.1050],
    [28.6050, 77.0700],
    [28.6400, 77.0650],
  ],
  'Vasant Vihar': [
    [28.5700, 77.1400],
    [28.5750, 77.1750],
    [28.5400, 77.1800],
    [28.5350, 77.1450],
    [28.5700, 77.1400],
  ],
  'Mayur Vihar': [
    [28.6250, 77.2700],
    [28.6300, 77.3050],
    [28.5950, 77.3100],
    [28.5900, 77.2750],
    [28.6250, 77.2700],
  ],
};

// Hotspots within Rohini Ward only
export const hotspots: Hotspot[] = [
  { id: '1', name: 'Rohini Sector 3 Market', coords: [28.7041, 77.1025], risk: 'HIGH', lastFlooded: '2024-08-01', depth: '3 feet', duration: '4 hours', description: 'Main market area with drainage issues during heavy rainfall' },
  { id: '2', name: 'Rohini Sector 7 Extension', coords: [28.7128, 77.1134], risk: 'HIGH', lastFlooded: '2024-07-28', depth: '3.5 feet', duration: '5 hours', description: 'Low-lying residential area prone to waterlogging' },
  { id: '3', name: 'Rohini Sector 11 Metro Station', coords: [28.7189, 77.1089], risk: 'MEDIUM', lastFlooded: '2024-07-22', depth: '2 feet', duration: '3 hours', description: 'Metro station underpass waterlogging' },
  { id: '4', name: 'Rohini Sector 16 Main Road', coords: [28.7312, 77.1145], risk: 'MEDIUM', lastFlooded: '2024-08-05', depth: '2.5 feet', duration: '3 hours', description: 'Main road connecting sectors with poor drainage' },
  { id: '5', name: 'Rohini Sector 24 Community Center', coords: [28.7423, 77.0989], risk: 'LOW', lastFlooded: '2024-07-15', depth: '1.5 feet', duration: '2 hours', description: 'Community center parking area waterlogging' },
  { id: '6', name: 'Rohini Sector 18 Park', coords: [28.7298, 77.0867], risk: 'MEDIUM', lastFlooded: '2024-08-10', depth: '2 feet', duration: '2.5 hours', description: 'Park and surrounding residential roads' },
  { id: '7', name: 'Rohini Sector 9 DDA Flats', coords: [28.7156, 77.1178], risk: 'HIGH', lastFlooded: '2024-08-12', depth: '3 feet', duration: '4 hours', description: 'DDA housing complex with recurring flood issues' },
  { id: '8', name: 'Rohini Sector 22 Industrial Area', coords: [28.7389, 77.1056], risk: 'MEDIUM', lastFlooded: '2024-07-25', depth: '2 feet', duration: '3 hours', description: 'Industrial units facing waterlogging problems' },
];

// Single ward - Rohini (hardcoded for MVP for User and Ward Admin)
export const CURRENT_WARD = 'Rohini';
export const CURRENT_WARD_NO = 8;

// All wards for Super Admin city-wide view
export const wards: Ward[] = [
  { 
    wardNo: 8, 
    name: 'Rohini', 
    readiness: 65, 
    resources: { pumps: 6, personnel: 25, vehicles: 4 }, 
    hotspots: 8, 
    lastMaintenance: '2024-04-15', 
    coords: [28.7250, 77.1000] 
  },
  { 
    wardNo: 12, 
    name: 'Dwarka', 
    readiness: 72, 
    resources: { pumps: 8, personnel: 30, vehicles: 5 }, 
    hotspots: 6, 
    lastMaintenance: '2024-05-10', 
    coords: [28.5921, 77.0460] 
  },
  { 
    wardNo: 45, 
    name: 'Karol Bagh', 
    readiness: 55, 
    resources: { pumps: 4, personnel: 20, vehicles: 3 }, 
    hotspots: 12, 
    lastMaintenance: '2024-03-20', 
    coords: [28.6519, 77.1895] 
  },
  { 
    wardNo: 78, 
    name: 'Shahdara', 
    readiness: 48, 
    resources: { pumps: 5, personnel: 22, vehicles: 3 }, 
    hotspots: 15, 
    lastMaintenance: '2024-02-28', 
    coords: [28.6833, 77.2833] 
  },
  { 
    wardNo: 23, 
    name: 'Najafgarh', 
    readiness: 68, 
    resources: { pumps: 7, personnel: 28, vehicles: 4 }, 
    hotspots: 9, 
    lastMaintenance: '2024-04-25', 
    coords: [28.6092, 76.9798] 
  },
  { 
    wardNo: 56, 
    name: 'Janakpuri', 
    readiness: 70, 
    resources: { pumps: 6, personnel: 26, vehicles: 4 }, 
    hotspots: 7, 
    lastMaintenance: '2024-05-01', 
    coords: [28.6219, 77.0831] 
  },
  { 
    wardNo: 34, 
    name: 'Vasant Vihar', 
    readiness: 78, 
    resources: { pumps: 9, personnel: 32, vehicles: 6 }, 
    hotspots: 4, 
    lastMaintenance: '2024-05-15', 
    coords: [28.5540, 77.1597] 
  },
  { 
    wardNo: 89, 
    name: 'Mayur Vihar', 
    readiness: 52, 
    resources: { pumps: 5, personnel: 21, vehicles: 3 }, 
    hotspots: 11, 
    lastMaintenance: '2024-03-10', 
    coords: [28.6082, 77.2892] 
  },
];

// Alerts - includes both Rohini-specific and city-wide
export const alerts: Alert[] = [
  // Rohini Ward (8)
  { id: '1', severity: 'Critical', location: 'Rohini Sector 9 DDA Flats', ward: 'Rohini', wardNo: 8, message: 'Water level rising rapidly - 3 feet and increasing', timestamp: new Date('2024-08-15T14:30:00'), isRead: false },
  { id: '2', severity: 'High', location: 'Rohini Sector 7 Extension', ward: 'Rohini', wardNo: 8, message: 'Waterlogging reported in residential area, pumps deployed', timestamp: new Date('2024-08-15T13:45:00'), isRead: false },
  { id: '3', severity: 'Medium', location: 'Rohini Sector 11 Metro Station', ward: 'Rohini', wardNo: 8, message: 'Minor waterlogging at metro station underpass', timestamp: new Date('2024-08-15T12:00:00'), isRead: true },
  { id: '4', severity: 'High', location: 'Rohini Sector 3 Market', ward: 'Rohini', wardNo: 8, message: 'Market area experiencing severe waterlogging, traffic diverted', timestamp: new Date('2024-08-15T10:15:00'), isRead: false },
  { id: '5', severity: 'Low', location: 'Rohini Sector 24 Community Center', ward: 'Rohini', wardNo: 8, message: 'Drainage cleared, situation normalizing', timestamp: new Date('2024-08-15T09:00:00'), isRead: true },
  
  // Other Wards
  { id: '6', severity: 'Critical', location: 'Shahdara Main Road', ward: 'Shahdara', wardNo: 78, message: 'Severe waterlogging blocking major intersection', timestamp: new Date('2024-08-15T14:15:00'), isRead: false },
  { id: '7', severity: 'High', location: 'Karol Bagh Metro', ward: 'Karol Bagh', wardNo: 45, message: 'Metro station entrance flooded, services disrupted', timestamp: new Date('2024-08-15T13:30:00'), isRead: false },
  { id: '8', severity: 'Medium', location: 'Dwarka Sector 10', ward: 'Dwarka', wardNo: 12, message: 'Residential area experiencing minor waterlogging', timestamp: new Date('2024-08-15T12:45:00'), isRead: false },
  { id: '9', severity: 'Critical', location: 'Mayur Vihar Phase 2', ward: 'Mayur Vihar', wardNo: 89, message: 'Drainage system failure, water entering homes', timestamp: new Date('2024-08-15T11:20:00'), isRead: false },
  { id: '10', severity: 'Low', location: 'Vasant Vihar Colony', ward: 'Vasant Vihar', wardNo: 34, message: 'Minor puddles, clearing in progress', timestamp: new Date('2024-08-15T10:00:00'), isRead: true },
  { id: '11', severity: 'Medium', location: 'Najafgarh Village', ward: 'Najafgarh', wardNo: 23, message: 'Agricultural area waterlogging, monitoring situation', timestamp: new Date('2024-08-15T09:30:00'), isRead: false },
  { id: '12', severity: 'High', location: 'Janakpuri District Centre', ward: 'Janakpuri', wardNo: 56, message: 'Shopping complex parking flooded', timestamp: new Date('2024-08-15T08:45:00'), isRead: false },
];

export const rainfallData: RainfallData[] = [
  { year: 2019, months: { june: 45, july: 210, august: 180, september: 95 }, total: 530 },
  { year: 2020, months: { june: 52, july: 245, august: 198, september: 88 }, total: 583 },
  { year: 2021, months: { june: 38, july: 280, august: 220, september: 102 }, total: 640 },
  { year: 2022, months: { june: 65, july: 195, august: 165, september: 78 }, total: 503 },
  { year: 2023, months: { june: 58, july: 320, august: 245, september: 115 }, total: 738 },
  { year: 2024, months: { june: 72, july: 285, august: 210, september: 98 }, total: 665 },
  { year: 2025, months: { june: 55, july: 290, august: 225, september: 105 }, total: 675, isPrediction: true },
];

// Stats - City-wide for Super Admin, ward-specific filtered by components
export const stats = {
  totalHotspots: 72, // Sum of all ward hotspots (8+6+12+15+9+7+4+11)
  highRiskZones: 38, // High-risk hotspots across all wards
  wardReadiness: 65, // Rohini ward readiness (for Ward Admin)
  activeAlerts: 12, // All alerts
  resolvedIssues: 47, // City-wide resolved issues
};
