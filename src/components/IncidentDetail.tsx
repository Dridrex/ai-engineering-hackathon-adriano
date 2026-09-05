import React from 'react';
import { Incident, Status } from '../types/incident';
import { X, Clock, User, Calendar, History, ArrowRight } from 'lucide-react';

interface IncidentDetailProps {
  incident: Incident | null;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: Status) => void;
}

export const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onClose, onStatusChange }) => {
  if (!incident) return null;

  const statuses: Status[] = ['Open', 'In Progress', 'Resolved'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {incident.id}</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.125rem' }}>{incident.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          <p style={{ color: 'var(--text-primary)' }}>{incident.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
          <div><span style={{ color: 'var(--text-muted)' }}>Severidade:</span> <strong>{incident.severity}</strong></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Responsável:</span> <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} />{incident.owner}</strong></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Criado em:</span> <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} />{new Date(incident.createdAt).toLocaleString()}</span></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Atualizado em:</span> <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} />{new Date(incident.updatedAt).toLocaleString()}</span></div>
        </div>

        <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Alterar Status:</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(incident.id, st)}
                disabled={incident.status === st}
                className="btn"
                style={{
                  flex: 1,
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  justifyContent: 'center',
                  background: incident.status === st ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: incident.status === st ? '#fff' : 'var(--text-muted)',
                  opacity: incident.status === st ? 1 : 0.8,
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <History size={16} /> Histórico de Transições
          </h3>
          {incident.history.length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nenhuma alteração registrada ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {incident.history.map((h) => (
                <div key={h.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{h.fromStatus}</span>
                    <ArrowRight size={12} style={{ color: 'var(--accent-primary)' }} />
                    <strong style={{ color: 'var(--text-primary)' }}>{h.toStatus}</strong>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
