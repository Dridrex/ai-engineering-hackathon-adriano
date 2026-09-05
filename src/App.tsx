import React, { useState } from 'react';
import { Incident, Status, Severity } from './types/incident';
import { getIncidents, saveIncidents } from './storage/incidentStorage';
import { createIncident, updateIncidentStatus, calculateDashboardStats, InvalidStatusTransitionError } from './services/incidentService';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { IncidentFilter } from './components/IncidentFilter';
import { IncidentList } from './components/IncidentList';
import { IncidentForm } from './components/IncidentForm';
import { IncidentDetail } from './components/IncidentDetail';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(getIncidents);
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'All'>('All');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateIncident = (data: { title: string; description: string; severity: Severity; owner: string }) => {
    const updated = createIncident(incidents, data);
    setIncidents(updated);
    saveIncidents(updated);
  };

  const handleStatusChange = (id: string, newStatus: Status) => {
    try {
      const updated = updateIncidentStatus(incidents, id, newStatus);
      setIncidents(updated);
      saveIncidents(updated);
      if (selectedIncident && selectedIncident.id === id) {
        setSelectedIncident(updated.find((i) => i.id === id) || null);
      }
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof InvalidStatusTransitionError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao atualizar o status do incidente.');
      }
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;
    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const stats = calculateDashboardStats(incidents);

  return (
    <div className="container">
      <Header onOpenNewModal={() => setIsFormOpen(true)} />
      <DashboardStats stats={stats} />

      <IncidentFilter
        statusFilter={statusFilter}
        severityFilter={severityFilter}
        onStatusChange={setStatusFilter}
        onSeverityChange={setSeverityFilter}
      />

      <IncidentList
        incidents={filteredIncidents}
        onSelectIncident={(inc) => setSelectedIncident(inc)}
      />

      <IncidentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateIncident}
      />

      <IncidentDetail
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onStatusChange={handleStatusChange}
      />

      <Notification
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default App;
