import React, { useState } from 'react';
import { Severity } from '../types/incident';
import { X, Check } from 'lucide-react';

interface IncidentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; severity: Severity; owner: string }) => void;
}

export const IncidentForm: React.FC<IncidentFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [owner, setOwner] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !owner.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), severity, owner: owner.trim() });
    setTitle('');
    setDescription('');
    setSeverity('Medium');
    setOwner('');
    onClose();
  };

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'var(--text-primary)',
    outline: 'none',
    marginTop: '0.25rem',
    fontSize: '0.875rem',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Novo Incidente</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Título *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Payment API instability" style={inputStyle} />
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Descrição *</label>
            <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva o problema e impacto operacional..." style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Severidade *</label>
              <select value={severity} onChange={(e) => setSeverity(e.target.value as Severity)} style={inputStyle}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Responsável *</label>
              <input type="text" required value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Ex: Ana" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
            <button type="submit" className="btn btn-primary"><Check size={18} /> Criar Incidente</button>
          </div>
        </form>
      </div>
    </div>
  );
};
