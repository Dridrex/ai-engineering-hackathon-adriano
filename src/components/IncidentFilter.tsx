import React from 'react';
import { Status, Severity } from '../types/incident';
import { Filter } from 'lucide-react';

interface IncidentFilterProps {
  statusFilter: Status | 'All';
  severityFilter: Severity | 'All';
  onStatusChange: (status: Status | 'All') => void;
  onSeverityChange: (severity: Severity | 'All') => void;
}

export const IncidentFilter: React.FC<IncidentFilterProps> = ({
  statusFilter,
  severityFilter,
  onStatusChange,
  onSeverityChange,
}) => {
  const selectStyle = {
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'rgba(0, 0, 0, 0.3)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.875rem',
  };

  return (
    <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>
        <Filter size={16} /> Filtros:
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status:</label>
        <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value as Status | 'All')} style={selectStyle}>
          <option value="All">Todos os Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Severidade:</label>
        <select value={severityFilter} onChange={(e) => onSeverityChange(e.target.value as Severity | 'All')} style={selectStyle}>
          <option value="All">Todas as Severidades</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </div>
  );
};
