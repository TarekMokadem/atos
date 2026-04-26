import { normalizeApiBaseUrl } from './normalize-api-base-url';

describe('normalizeApiBaseUrl', () => {
  it('ajoute /api/v1 lorsque le suffixe manque', () => {
    expect(normalizeApiBaseUrl('https://api.example.com')).toBe('https://api.example.com/api/v1');
  });

  it('ne duplique pas /api/v1', () => {
    expect(normalizeApiBaseUrl('https://api.example.com/api/v1')).toBe('https://api.example.com/api/v1');
  });

  it('retire les barres finales avant de normaliser', () => {
    expect(normalizeApiBaseUrl('https://host///')).toBe('https://host/api/v1');
  });

  it('retourne chaîne vide pour entrée vide', () => {
    expect(normalizeApiBaseUrl('')).toBe('');
    expect(normalizeApiBaseUrl(null)).toBe('');
  });
});
