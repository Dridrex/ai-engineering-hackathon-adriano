import React, { useState } from 'react';
import { Incident, Status, Severity } from './types/incident';
import {
  getIncidents,
  saveIncidents,
  getFormDraft,
  saveFormDraft,
  getUiState,
  saveUiState,
  resetToSeedData,
  FormDraft,
} from './storage/incidentStorage';
import {
  createIncident,
  updateIncidentStatus,
  addCommentToIncident,
  calculateDashboardStats,
  InvalidStatusTransitionError,
  InvalidCommentError,
} from './services/incidentService';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { IncidentFilter } from './components/IncidentFilter';
import { IncidentList } from './components/IncidentList';
import { IncidentForm } from './components/IncidentForm';
import { IncidentDetail } from './components/IncidentDetail';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(getIncidents);
  const [formDraft, setFormDraft] = useState<FormDraft>(getFormDraft);
  const [uiState, setUiState] = useState(getUiState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedIncident = uiState.selectedIncidentId
    ? incidents.find((i) => i.id === uiState.selectedIncidentId) || null
    : null;

  const updateDraft = (updated: Partial<FormDraft>) => {
    setFormDraft((prev) => {
      const next = { ...prev, ...updated };
      saveFormDraft(next);
      return next;
    });
  };

  const updateUi = (updated: Partial<typeof uiState>) => {
    setUiState((prev) => {
      const next = { ...prev, ...updated };
      saveUiState(next);
      return next;
    });
  };

  const handleCreateIncident = (data: { title: string; description: string; severity: Severity; owner: string }) => {
    const updated = createIncident(incidents, data);
    setIncidents(updated);
    saveIncidents(updated);
    updateDraft({ isOpen: false, title: '', description: '', severity: 'Medium', owner: '' });
  };

  const handleStatusChange = (id: string, newStatus: Status, resolutionNotes?: string) => {
    try {
      const updated = updateIncidentStatus(incidents, id, newStatus, resolutionNotes);
      setIncidents(updated);
      saveIncidents(updated);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof InvalidStatusTransitionError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao atualizar o status do incidente.');
      }
    }
  };

  const handleAddComment = (id: string, author: string, content: string) => {
    try {
      const updated = addCommentToIncident(incidents, id, author, content);
      setIncidents(updated);
      saveIncidents(updated);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof InvalidCommentError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao adicionar o comentário.');
      }
    }
  };

  const handleResetData = () => {
    if (window.confirm('Deseja restaurar os dados iniciais de exemplo (Ana, Bruno e Carla)?')) {
      resetToSeedData();
      setIncidents(getIncidents());
      setFormDraft(getFormDraft());
      setUiState(getUiState());
      setErrorMessage(null);
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    const matchesStatus = uiState.statusFilter === 'All' || inc.status === uiState.statusFilter;
    const matchesSeverity = uiState.severityFilter === 'All' || inc.severity === uiState.severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const stats = calculateDashboardStats(incidents);

  return (
    <div className="container">
      <Header
        onOpenNewModal={() => updateDraft({ isOpen: true })}
        onResetData={handleResetData}
      />
      <DashboardStats stats={stats} />

      <IncidentFilter
        statusFilter={uiState.statusFilter}
        severityFilter={uiState.severityFilter}
        onStatusChange={(statusFilter) => updateUi({ statusFilter })}
        onSeverityChange={(severityFilter) => updateUi({ severityFilter })}
      />

      <IncidentList
        incidents={filteredIncidents}
        onSelectIncident={(inc) => updateUi({ selectedIncidentId: inc.id })}
      />

      <IncidentForm
        isOpen={formDraft.isOpen}
        draft={formDraft}
        onClose={() => updateDraft({ isOpen: false })}
        onDraftChange={updateDraft}
        onSubmit={handleCreateIncident}
      />

      <IncidentDetail
        incident={selectedIncident}
        onClose={() => updateUi({ selectedIncidentId: null })}
        onStatusChange={handleStatusChange}
        onAddComment={handleAddComment}
      />

      <Notification
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default App;
