/**
 * Le backend Spring expose tout sous /api/v1 (ex. /api/v1/auth/login).
 * Les déplois CI passent parfois seulement l’origine (https://host) : on complète alors le suffixe.
 */
export function normalizeApiBaseUrl(apiUrl: string | undefined | null): string {
  if (apiUrl == null || typeof apiUrl !== 'string') {
    return '';
  }
  const trimmed = apiUrl.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return '';
  }
  return trimmed.endsWith('/api/v1') ? trimmed : `${trimmed}/api/v1`;
}
