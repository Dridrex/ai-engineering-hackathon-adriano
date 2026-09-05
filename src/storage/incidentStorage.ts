import { Incident } from '../types/incident';

const STORAGE_KEY = 'incident_hub_data_v1';

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

export const getIncidents = (): Incident[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialSeedIncidents;
  } catch {
    return initialSeedIncidents;
  }
};

export const saveIncidents = (incidents: Incident[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  } catch (error) {
    console.error('Erro ao salvar no LocalStorage:', error);
  }
};
