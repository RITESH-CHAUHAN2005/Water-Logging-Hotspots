export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Hotspot {
  id: string;
  name: string;
  coords: [number, number];
  risk: RiskLevel;
  lastFlooded: string;
  depth: string;
  duration: string;
  description?: string;
}

export interface Ward {
  wardNo: number;
  name: string;
  readiness: number;
  resources: {
    pumps: number;
    personnel: number;
    vehicles: number;
  };
  hotspots: number;
  lastMaintenance: string;
  coords: [number, number];
}

export interface Alert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
  ward?: string; // Ward name (for multi-ward support)
  wardNo?: number; // Ward number (for multi-ward support)
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface RainfallData {
  year: number;
  months: {
    june: number;
    july: number;
    august: number;
    september: number;
  };
  total: number;
  isPrediction?: boolean;
}

// Sensitive Area Types
export interface SensitiveArea {
  id: string;
  type: 'hospital' | 'school' | 'metro';
  name: string;
  latitude: number;
  longitude: number;
  ward: string;
  wardNo: number;
}

// User Report with Field Worker assignment
export interface UserReport {
  id: number;
  userId: string;
  user: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'Pending' | 'In Progress' | 'Assigned' | 'Work Completed' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  image?: string | null;
  feedback?: 'positive' | 'negative' | null;
  feedbackDate?: string;
  ward?: string;
  
  // Field Worker related fields
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  workerStartedAt?: string;
  workerCompletedAt?: string;
  completionProofUrl?: string;
}
