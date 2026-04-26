import { environment } from './environment';
import { normalizeApiBaseUrl } from './normalize-api-base-url';

/** Toujours suffixée par /api/v1 pour correspondre à SecurityConfiguration et aux contrôleurs. */
export const API_BASE_URL = normalizeApiBaseUrl(environment.apiUrl);
