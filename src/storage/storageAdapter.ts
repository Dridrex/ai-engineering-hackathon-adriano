import { AppState } from '../types';

const STORAGE_KEY = 'ai_hackathon_app_state';

const initialSeedData: AppState = {
  config: {
    appName: 'AI Engineering Hackathon Solution',
    version: '1.0.0',
    environment: 'development',
    naturalLanguageOnly: true,
  },
  tasks: [
    { id: '1', title: 'Configurar ambiente e repositório Git', completed: true, timestamp: new Date().toISOString() },
    { id: '2', title: 'Elaborar spec.md e PRD.md', completed: true, timestamp: new Date().toISOString() },
    { id: '3', title: 'Configurar agentes Auditor e QA', completed: true, timestamp: new Date().toISOString() },
    { id: '4', title: 'Inicializar aplicação React + TypeScript + Vite', completed: true, timestamp: new Date().toISOString() },
  ],
  lastSync: new Date().toISOString(),
};

export const getAppState = (): AppState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialSeedData;
  } catch (error) {
    console.warn('Erro ao acessar localStorage, usando dados em memória:', error);
    return initialSeedData;
  }
};

export const saveAppState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};
