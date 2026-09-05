import { describe, it, expect } from 'vitest';
import { initialSeedIncidents } from '../storage/incidentStorage';
import { createIncident, updateIncidentStatus, calculateDashboardStats, InvalidStatusTransitionError } from '../services/incidentService';
import { Incident } from '../types/incident';

describe('IncidentService & Business Rules Tests', () => {
  it('deve carregar os 3 incidentes de exemplo (Ana, Bruno, Carla)', () => {
    expect(initialSeedIncidents.length).toBe(3);
    expect(initialSeedIncidents[0].owner).toBe('Ana');
    expect(initialSeedIncidents[0].severity).toBe('Critical');
    expect(initialSeedIncidents[0].status).toBe('Open');

    expect(initialSeedIncidents[1].owner).toBe('Bruno');
    expect(initialSeedIncidents[1].status).toBe('In Progress');

    expect(initialSeedIncidents[2].owner).toBe('Carla');
    expect(initialSeedIncidents[2].status).toBe('Resolved');
  });

  it('deve criar um novo incidente com status Open automático', () => {
    const incidents = createIncident(initialSeedIncidents, {
      title: 'Database connection latency',
      description: 'High latency observed in primary PostgreSQL cluster.',
      severity: 'High',
      owner: 'Diego',
    });

    expect(incidents.length).toBe(4);
    expect(incidents[0].title).toBe('Database connection latency');
    expect(incidents[0].status).toBe('Open');
    expect(incidents[0].owner).toBe('Diego');
  });

  it('⚠️ DEVE IMPEDIR que incidente Critical passe direto de Open para Resolved', () => {
    const criticalOpenIncident: Incident = {
      id: 'test-critical',
      title: 'Critical Outage',
      description: 'System down',
      severity: 'Critical',
      owner: 'Tester',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };

    const list = [criticalOpenIncident];

    // Tentativa inválida: Open -> Resolved para Critical
    expect(() => {
      updateIncidentStatus(list, 'test-critical', 'Resolved');
    }).toThrowError(InvalidStatusTransitionError);
  });

  it('deve permitir transição válida de Critical: Open ➔ In Progress ➔ Resolved', () => {
    const criticalOpenIncident: Incident = {
      id: 'test-critical-flow',
      title: 'Critical Outage',
      description: 'System down',
      severity: 'Critical',
      owner: 'Tester',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };

    let list = [criticalOpenIncident];

    // Passagem 1: Open -> In Progress (permitido)
    list = updateIncidentStatus(list, 'test-critical-flow', 'In Progress');
    expect(list[0].status).toBe('In Progress');
    expect(list[0].history.length).toBe(1);

    // Passagem 2: In Progress -> Resolved (permitido)
    list = updateIncidentStatus(list, 'test-critical-flow', 'Resolved');
    expect(list[0].status).toBe('Resolved');
    expect(list[0].history.length).toBe(2);
  });

  it('deve calcular estatísticas do Dashboard corretamente', () => {
    const stats = calculateDashboardStats(initialSeedIncidents);
    // Ana (Critical Open -> Open), Bruno (High In Progress -> Open), Carla (Medium Resolved -> Resolved)
    expect(stats.totalOpen).toBe(2); // Open + In Progress
    expect(stats.criticalPending).toBe(1); // Ana
    expect(stats.totalResolved).toBe(1); // Carla
  });
});
