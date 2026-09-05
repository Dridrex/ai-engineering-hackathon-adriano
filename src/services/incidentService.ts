import { Incident, Severity, Status, DashboardStats, HistoryEntry } from '../types/incident';

export class InvalidStatusTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidStatusTransitionError';
  }
}

export const createIncident = (
  incidents: Incident[],
  data: { title: string; description: string; severity: Severity; owner: string }
): Incident[] => {
  const now = new Date().toISOString();
  const newIncident: Incident = {
    id: `inc-${Date.now()}`,
    title: data.title,
    description: data.description,
    severity: data.severity,
    owner: data.owner,
    status: 'Open',
    createdAt: now,
    updatedAt: now,
    history: [],
  };
  return [newIncident, ...incidents];
};

export const updateIncidentStatus = (
  incidents: Incident[],
  id: string,
  newStatus: Status,
  resolutionNotes?: string
): Incident[] => {
  return incidents.map((inc) => {
    if (inc.id !== id) return inc;
    if (inc.status === newStatus) return inc;

    // Regra de Negócio Crítica (Seção 7 do Challenge Pack): Incidentes Critical não podem ir de Open direto para Resolved
    if (inc.severity === 'Critical' && inc.status === 'Open' && newStatus === 'Resolved') {
      throw new InvalidStatusTransitionError(
        'Um incidente Critical não pode passar diretamente de Open para Resolved. Altere primeiro para In Progress.'
      );
    }

    // Regra de Resolução: Transição para Resolved exige descrição obrigatória da resolução
    if (newStatus === 'Resolved' && (!resolutionNotes || !resolutionNotes.trim())) {
      throw new InvalidStatusTransitionError(
        'A descrição da resolução é obrigatória para alterar o status para Resolved.'
      );
    }

    const now = new Date().toISOString();
    const historyEntry: HistoryEntry = {
      id: `h-${Date.now()}`,
      fromStatus: inc.status,
      toStatus: newStatus,
      timestamp: now,
      resolutionNotes: newStatus === 'Resolved' ? resolutionNotes?.trim() : undefined,
    };

    return {
      ...inc,
      status: newStatus,
      updatedAt: now,
      resolutionNotes: newStatus === 'Resolved' ? resolutionNotes?.trim() : inc.resolutionNotes,
      history: [historyEntry, ...inc.history],
    };
  });
};

export const calculateDashboardStats = (incidents: Incident[]): DashboardStats => {
  const totalOpen = incidents.filter((i) => i.status === 'Open' || i.status === 'In Progress').length;
  const criticalPending = incidents.filter((i) => i.severity === 'Critical' && i.status !== 'Resolved').length;
  const totalResolved = incidents.filter((i) => i.status === 'Resolved').length;

  return { totalOpen, criticalPending, totalResolved };
};
