import { demoAccounts, showDemoChrome } from './demo-settings';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  demoMode: showDemoChrome,
  demoAccounts,
  /** Ping `/actuator/health` pour limiter la mise en veille (ex. Render) ; voir ServerKeepAliveService. */
  serverKeepAlive: true,
};
