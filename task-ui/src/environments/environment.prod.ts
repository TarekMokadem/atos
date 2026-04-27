import { demoAccounts, showDemoChrome } from './demo-settings';

/**
 * En CI (Cloudflare), ce fichier peut être réécrit avec seulement production + apiUrl.
 * Le bandeau et les comptes démo viennent de demo-settings.ts (non écrasé).
 */
export const environment = {
  production: true,
  apiUrl: 'https://VOTRE-API-PUBLIQUE.onrender.com/api/v1',
  demoMode: showDemoChrome,
  demoAccounts,
  serverKeepAlive: true,
};
