export interface AppConfig {
  appName: string;
  version: string;
  environment: 'development' | 'production';
  naturalLanguageOnly: boolean;
}

export interface TaskStatus {
  id: string;
  title: string;
  completed: boolean;
  timestamp: string;
}

export interface AppState {
  config: AppConfig;
  tasks: TaskStatus[];
  lastSync: string;
}
