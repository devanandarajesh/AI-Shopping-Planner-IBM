export interface AppConfig {
  apiBaseUrl: string;
  recommendationSource: 'local' | 'api';
}

function readEnv(key: string, fallback = ''): string {
  const value = import.meta.env[key] as string | undefined;
  return value ?? fallback;
}

export const config: AppConfig = {
  apiBaseUrl: readEnv('VITE_API_BASE_URL', ''),
  recommendationSource:
    readEnv('VITE_RECOMMENDATION_SOURCE', 'local') === 'api'
      ? 'api'
      : 'local',
};

export const isApiEnabled = config.recommendationSource === 'api';
