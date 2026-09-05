export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Open' | 'In Progress' | 'Resolved';

export interface HistoryEntry {
  id: string;
  fromStatus: Status;
  toStatus: Status;
  timestamp: string;
  resolutionNotes?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  owner: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  history: HistoryEntry[];
  resolutionNotes?: string;
}

export interface DashboardStats {
  totalOpen: number;
  criticalPending: number;
  totalResolved: number;
}
