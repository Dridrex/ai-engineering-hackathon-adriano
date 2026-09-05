import React from 'react';
import { TaskStatus } from '../types';
import { CheckSquare, Square, Plus } from 'lucide-react';

interface DashboardProps {
  tasks: TaskStatus[];
  onToggleTask: (id: string) => void;
  onAddTask: (title: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const [newTitle, setNewTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim());
    setNewTitle('');
  };

  return (
    <div className="glass-card">
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>
        Checkpoints & Status do Projeto
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Adicionar nova tarefa / requisito..."
          style={{
            flex: 1,
            padding: '0.625rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.2)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        <button type="submit" className="btn btn-primary">
          <Plus size={18} /> Adicionar
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            {task.completed ? (
              <CheckSquare style={{ color: 'var(--accent-secondary)' }} size={20} />
            ) : (
              <Square style={{ color: 'var(--text-muted)' }} size={20} />
            )}
            <span>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
