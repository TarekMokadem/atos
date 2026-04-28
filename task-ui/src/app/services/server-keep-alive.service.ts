import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_BASE_URL } from '../../environments/api-base-url';
import { actuatorHealthUrlFromApiBase } from '../../environments/normalize-api-base-url';
import { environment } from '../../environments/environment';

/** Cloudflare Pages réécrit souvent `environment.prod.ts` avec seulement `production` + `apiUrl`. */
function isServerKeepAliveDisabled(env: typeof environment): boolean {
  return (env as { serverKeepAlive?: boolean }).serverKeepAlive === false;
}

const INTERVAL_MS = 60_000;
const QUIET_START_HOUR_PARIS = 0;
const QUIET_END_HOUR_PARIS = 7;

/**
 * Envoie périodiquement une requête GET vers `/actuator/health` pour réduire
 * l’inactivité du backend (ex. mise en veille Render). Aucun appel entre
 * minuit et 7h, heure de Paris.
 */
@Injectable({ providedIn: 'root' })
export class ServerKeepAliveService {
  private sub: Subscription | null = null;

  constructor(private readonly http: HttpClient) {}

  start(): void {
    if (this.sub || isServerKeepAliveDisabled(environment)) {
      return;
    }
    const healthUrl = actuatorHealthUrlFromApiBase(API_BASE_URL);
    if (!healthUrl.startsWith('http')) {
      return;
    }

    this.sub = timer(0, INTERVAL_MS)
      .pipe(
        filter(() => !this.isQuietHoursParis()),
        switchMap(() =>
          this.http.get(healthUrl, { responseType: 'text' }).pipe(catchError(() => of(null)))
        )
      )
      .subscribe();
  }

  /** Entre 00:00 inclus et 07:00 exclus, fuseau Europe/Paris. */
  private isQuietHoursParis(): boolean {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const hourRaw = parts.find((p) => p.type === 'hour')?.value;
    const hour = hourRaw != null ? parseInt(hourRaw, 10) : NaN;
    if (Number.isNaN(hour)) {
      return false;
    }
    return hour >= QUIET_START_HOUR_PARIS && hour < QUIET_END_HOUR_PARIS;
  }
}
