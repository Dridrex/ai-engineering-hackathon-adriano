import React from 'react';
import { Incident, Severity, Status } from '../types/incident';
import { Eye, User, Clock } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

const severityColors: Record<Severity, { bg: string; text: string }> = {
  Low: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
  Medium: { bg: 'rgba(234, 179, 8, 0.15)', text: '#facc15' },
  High: { bg: 'rgba(249, 115, 22, 0.15)', text: '#fb923c' },
  Critical: { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171' },
};

const statusColors: Record<Status, { bg: string; text: string }> = {
  Open: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171' },
  'In Progress': { bg: 'rgba(234, 179, 8, 0.15)', text: '#facc15' },
  Resolved: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80' },
};

export const IncidentList: React.FC<IncidentListProps> = ({ incidents, onSelectIncident }) => {
  if (incidents.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
        Nenhum incidente encontrado para os filtros selecionados.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {incidents.map((inc) => (
        <div
          key={inc.id}
          className="glass-card"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, background 0.15s ease',
          }}
          onClick={() => onSelectIncident(inc)}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: severityColors[inc.severity].bg,
                  color: severityColors[inc.severity].text,
                }}
              >
                {inc.severity}
              </span>

              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: statusColors[inc.status].bg,
                  color: statusColors[inc.status].text,
                }}
              >
                {inc.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{inc.title}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={14} /> {inc.owner}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> {new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', padding: '0.5rem' }}>
            <Eye size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
