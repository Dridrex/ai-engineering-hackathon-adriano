import { describe, it, expect } from 'vitest';
import { initialSeedIncidents } from '../storage/incidentStorage';
import {
  createIncident,
  updateIncidentStatus,
  addCommentToIncident,
  getUnifiedTimeline,
  calculateDashboardStats,
  InvalidStatusTransitionError,
  InvalidCommentError,
} from '../services/incidentService';
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

    // Tentativa inválida: Open -> Resolved para Critical
    expect(() => {
      updateIncidentStatus([criticalOpenIncident], 'test-critical', 'Resolved');
    }).toThrowError(InvalidStatusTransitionError);
  });

  it('deve PERMITIR que incidente High passe de Open para Resolved com descrição', () => {
    const highOpenIncident: Incident = {
      id: 'test-high',
      title: 'High Outage',
      description: 'System slow',
      severity: 'High',
      owner: 'Tester',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
    };

    // High PODE ir diretamente de Open -> Resolved (com descrição obrigatória)
    const result = updateIncidentStatus([highOpenIncident], 'test-high', 'Resolved', 'Latência normalizada após restart.');
    expect(result[0].status).toBe('Resolved');
    expect(result[0].resolutionNotes).toBe('Latência normalizada após restart.');
  });

  it('deve permitir transição válida de Critical: Open ➔ In Progress ➔ Resolved com descrição', () => {
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

    // Tentativa inválida sem descrição de resolução
    expect(() => {
      updateIncidentStatus(list, 'test-critical-flow', 'Resolved');
    }).toThrowError(InvalidStatusTransitionError);

    // Passagem 2: In Progress -> Resolved com descrição (permitido)
    list = updateIncidentStatus(list, 'test-critical-flow', 'Resolved', 'Servidor primário reiniciado e banco reindexado.');
    expect(list[0].status).toBe('Resolved');
    expect(list[0].resolutionNotes).toBe('Servidor primário reiniciado e banco reindexado.');
    expect(list[0].history[0].resolutionNotes).toBe('Servidor primário reiniciado e banco reindexado.');
  });

  // --- COMPONENTES DO CHANGE REQUEST #1 ---

  it('💬 deve ADICIONAR comentário com autor e conteúdo válidos', () => {
    const incident: Incident = {
      id: 'inc-comment-test',
      title: 'Test Incident',
      description: 'Desc',
      severity: 'Medium',
      owner: 'Ana',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
      comments: [],
    };

    const updated = addCommentToIncident([incident], 'inc-comment-test', 'Ana', 'Provider contacted.');
    expect(updated[0].comments?.length).toBe(1);
    expect(updated[0].comments?.[0].author).toBe('Ana');
    expect(updated[0].comments?.[0].content).toBe('Provider contacted.');
  });

  it('🚫 deve REJEITAR comentários com autor ou conteúdo vazios', () => {
    const incident: Incident = {
      id: 'inc-comment-test',
      title: 'Test Incident',
      description: 'Desc',
      severity: 'Medium',
      owner: 'Ana',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [],
      comments: [],
    };

    // Autor vazio
    expect(() => {
      addCommentToIncident([incident], 'inc-comment-test', '   ', 'Provider contacted.');
    }).toThrowError(InvalidCommentError);

    // Conteúdo vazio
    expect(() => {
      addCommentToIncident([incident], 'inc-comment-test', 'Ana', '   ');
    }).toThrowError(InvalidCommentError);
  });

  it('⏱️ deve GERAR Timeline Unificada ordenada por data/hora cronológica decrescente', () => {
    const incident: Incident = {
      id: 'inc-timeline-test',
      title: 'Test Incident',
      description: 'Desc',
      severity: 'Medium',
      owner: 'Ana',
      status: 'Open',
      createdAt: '2026-09-05T10:00:00.000Z',
      updatedAt: '2026-09-05T11:14:00.000Z',
      history: [
        {
          id: 'h-1',
          fromStatus: 'Open',
          toStatus: 'In Progress',
          timestamp: '2026-09-05T10:31:00.000Z',
        },
        {
          id: 'h-2',
          fromStatus: 'In Progress',
          toStatus: 'Resolved',
          timestamp: '2026-09-05T11:14:00.000Z',
          resolutionNotes: 'Fix applied.',
        },
      ],
      comments: [
        {
          id: 'c-1',
          author: 'Ana',
          content: 'Provider contacted.',
          createdAt: '2026-09-05T10:42:00.000Z',
        },
      ],
    };

    const timeline = getUnifiedTimeline(incident);

    // Timeline deve ter 3 itens: h-2 (11:14), c-1 (10:42), h-1 (10:31)
    expect(timeline.length).toBe(3);
    expect(timeline[0].id).toBe('h-2'); // 11:14
    expect(timeline[0].type).toBe('status_change');

    expect(timeline[1].id).toBe('c-1'); // 10:42
    expect(timeline[1].type).toBe('comment');
    expect(timeline[1].author).toBe('Ana');
    expect(timeline[1].content).toBe('Provider contacted.');

    expect(timeline[2].id).toBe('h-1'); // 10:31
    expect(timeline[2].type).toBe('status_change');
  });

  it('deve calcular estatísticas do Dashboard corretamente', () => {
    const stats = calculateDashboardStats(initialSeedIncidents);
    expect(stats.totalOpen).toBe(2);
    expect(stats.criticalPending).toBe(1);
    expect(stats.totalResolved).toBe(1);
  });
});
