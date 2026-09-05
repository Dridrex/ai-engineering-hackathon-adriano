import { Incident, Severity, Status } from '../types/incident';

const STORAGE_KEY_INCIDENTS = 'incident_hub_data_v1';
const STORAGE_KEY_DRAFT = 'incident_hub_form_draft_v1';
const STORAGE_KEY_UI = 'incident_hub_ui_state_v1';

export interface FormDraft {
  isOpen: boolean;
  title: string;
  description: string;
  severity: Severity;
  owner: string;
}

export interface UiState {
  statusFilter: Status | 'All';
  severityFilter: Severity | 'All';
  selectedIncidentId: string | null;
}

export const initialSeedIncidents: Incident[] = [
  {
    id: 'inc-1',
    title: 'Payment API instability',
    description: 'Payment gateway returning intermittent 504 gateway timeout errors.',
    severity: 'Critical',
    owner: 'Ana',
    status: 'Open',
    createdAt: '2026-09-05T08:15:00.000Z',
    updatedAt: '2026-09-05T08:15:00.000Z',
    history: [],
  },
  {
    id: 'inc-2',
    title: 'Reconciliation delay',
    description: 'End-of-day financial reconciliation job running 2 hours behind schedule.',
    severity: 'High',
    owner: 'Bruno',
    status: 'In Progress',
    createdAt: '2026-09-05T08:20:00.000Z',
    updatedAt: '2026-09-05T08:30:00.000Z',
    history: [
      {
        id: 'h-1',
        fromStatus: 'Open',
        toStatus: 'In Progress',
        timestamp: '2026-09-05T08:30:00.000Z',
      },
    ],
  },
  {
    id: 'inc-3',
    title: 'Incorrect customer notification',
    description: 'Notification service sent duplicated email triggers to test accounts.',
    severity: 'Medium',
    owner: 'Carla',
    status: 'Resolved',
    createdAt: '2026-09-05T07:45:00.000Z',
    updatedAt: '2026-09-05T08:10:00.000Z',
    history: [
      {
        id: 'h-2',
        fromStatus: 'Open',
        toStatus: 'In Progress',
        timestamp: '2026-09-05T07:55:00.000Z',
      },
      {
        id: 'h-3',
        fromStatus: 'In Progress',
        toStatus: 'Resolved',
        timestamp: '2026-09-05T08:10:00.000Z',
      },
    ],
  },
];

export const defaultFormDraft: FormDraft = {
  isOpen: false,
  title: '',
  description: '',
  severity: 'Medium',
  owner: '',
};

export const defaultUiState: UiState = {
  statusFilter: 'All',
  severityFilter: 'All',
  selectedIncidentId: null,
};

export const getIncidents = (): Incident[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_INCIDENTS);
    return data ? JSON.parse(data) : initialSeedIncidents;
  } catch {
    return initialSeedIncidents;
  }
};

export const saveIncidents = (incidents: Incident[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(incidents));
  } catch (error) {
    console.error('Erro ao salvar incidentes no LocalStorage:', error);
  }
};

export const getFormDraft = (): FormDraft => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DRAFT);
    return data ? JSON.parse(data) : defaultFormDraft;
  } catch {
    return defaultFormDraft;
  }
};

export const saveFormDraft = (draft: FormDraft): void => {
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draft));
  } catch (error) {
    console.error('Erro ao salvar rascunho no LocalStorage:', error);
  }
};

export const getUiState = (): UiState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_UI);
    return data ? JSON.parse(data) : defaultUiState;
  } catch {
    return defaultUiState;
  }
};

export const saveUiState = (ui: UiState): void => {
  try {
    localStorage.setItem(STORAGE_KEY_UI, JSON.stringify(ui));
  } catch (error) {
    console.error('Erro ao salvar estado de UI no LocalStorage:', error);
  }
};

export const resetToSeedData = (): void => {
  localStorage.removeItem(STORAGE_KEY_INCIDENTS);
  localStorage.removeItem(STORAGE_KEY_DRAFT);
  localStorage.removeItem(STORAGE_KEY_UI);
};
