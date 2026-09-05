import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (resolutionNotes: string) => void;
}

export const ResolutionModal: React.FC<ResolutionModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('A descrição da resolução não pode estar vazia.');
      return;
    }
    setError(null);
    onConfirm(notes.trim());
    setNotes('');
    onClose();
  };

  const handleCancel = () => {
    setNotes('');
    setError(null);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 150, padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px', background: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' }}>
            <CheckCircle2 size={20} /> Resolução do Incidente
          </h2>
          <button onClick={handleCancel} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              Descrição da Resolução do Problema *
            </label>
            <textarea
              required
              rows={4}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Descreva detalhadamente a solução aplicada para resolver este incidente..."
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                border: error ? '1px solid #ef4444' : '1px solid var(--border-color)',
                background: 'rgba(0, 0, 0, 0.4)',
                color: 'var(--text-primary)',
                outline: 'none',
                marginTop: '0.375rem',
                fontSize: '0.875rem',
              }}
            />
            {error && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{error}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={handleCancel} className="btn" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              OK / Confirmar Resolução
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
