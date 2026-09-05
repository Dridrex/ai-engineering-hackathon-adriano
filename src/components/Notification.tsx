import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        background: 'hsl(0, 84%, 18%)',
        color: '#f87171',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        padding: '0.875rem 1.25rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 200,
        maxWidth: '450px',
        fontSize: '0.875rem',
      }}
    >
      <AlertCircle size={22} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.25rem' }}>
        <X size={18} />
      </button>
    </div>
  );
};
