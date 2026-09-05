export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Open' | 'In Progress' | 'Resolved';

export interface HistoryEntry {
  id: string;
  fromStatus: Status;
  toStatus: Status;
  timestamp: string;
  resolutionNotes?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export type TimelineEventType = 'status_change' | 'comment';

export interface TimelineItem {
  id: string;
  type: TimelineEventType;
  timestamp: string;
  // Para status_change:
  fromStatus?: Status;
  toStatus?: Status;
  resolutionNotes?: string;
  // Para comment:
  author?: string;
  content?: string;
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
  comments?: Comment[];
  resolutionNotes?: string;
}

export interface DashboardStats {
  totalOpen: number;
  criticalPending: number;
  totalResolved: number;
}
