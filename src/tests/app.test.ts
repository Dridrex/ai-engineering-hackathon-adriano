import { describe, it, expect } from 'vitest';
import { getIncidents } from '../storage/incidentStorage';

describe('App & Seed Storage Integration Test', () => {
  it('deve carregar a lista inicial de incidentes do LocalStorage', () => {
    const incidents = getIncidents();
    expect(incidents).toBeDefined();
    expect(incidents.length).toBeGreaterThanOrEqual(3);
  });
});
