import React from 'react';
import { ShieldAlert, Plus, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenNewModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewModal, onResetData }) => {
  return (
    <header className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert style={{ color: 'var(--accent-primary)' }} /> Incident Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Central Operacional de Gestão & Acompanhamento de Incidentes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onResetData} className="btn" style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)' }} title="Restaurar dados iniciais de exemplo">
            <RotateCcw size={16} /> Resetar Dados
          </button>
          <button onClick={onOpenNewModal} className="btn btn-primary">
            <Plus size={18} /> Novo Incidente
          </button>
        </div>
      </div>
    </header>
  );
};
