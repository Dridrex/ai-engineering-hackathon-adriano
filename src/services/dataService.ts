import { AppState, TaskStatus } from '../types';
import { getAppState, saveAppState } from '../storage/storageAdapter';

export const loadInitialData = (): AppState => {
  return getAppState();
};

export const addTask = (state: AppState, title: string): AppState => {
  const newTask: TaskStatus = {
    id: Date.now().toString(),
    title,
    completed: false,
    timestamp: new Date().toISOString(),
  };
  const updatedState: AppState = {
    ...state,
    tasks: [...state.tasks, newTask],
    lastSync: new Date().toISOString(),
  };
  saveAppState(updatedState);
  return updatedState;
};

export const toggleTask = (state: AppState, taskId: string): AppState => {
  const updatedState: AppState = {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ),
    lastSync: new Date().toISOString(),
  };
  saveAppState(updatedState);
  return updatedState;
};
