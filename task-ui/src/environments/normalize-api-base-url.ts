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

/** URL `/actuator/health` à partir de la base `/api/v1` (même origine que l’API). */
export function actuatorHealthUrlFromApiBase(apiBaseV1Url: string): string {
  if (apiBaseV1Url == null || typeof apiBaseV1Url !== 'string') {
    return '';
  }
  const trimmed = apiBaseV1Url.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return '';
  }
  const origin = trimmed.replace(/\/api\/v1\/?$/i, '');
  return `${origin}/actuator/health`;
}
