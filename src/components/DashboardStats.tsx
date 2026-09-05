import React from 'react';
import { DashboardStats as StatsType } from '../types/incident';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DashboardStatsProps {
  stats: StatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1rem))', gap: '1rem', marginBottom: '1.5rem' }}>
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
          <AlertCircle size={28} />
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Incidentes Abertos</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stats.totalOpen}</h3>
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
          <AlertTriangle size={28} />
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Critical Pendentes</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ef4444' }}>{stats.criticalPending}</h3>
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
          <CheckCircle2 size={28} />
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Incidentes Resolvidos</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#22c55e' }}>{stats.totalResolved}</h3>
        </div>
      </div>
    </div>
  );
};
