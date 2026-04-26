import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const url = request.url;
        if (url.includes('/auth/login') || url.includes('/auth/register')) {
          return throwError(() => err);
        }
        if (err.status === 0) {
          this.snackBar.open(
            'Impossible de joindre le serveur. Vérifiez votre connexion ou l’URL de l’API.',
            'Fermer',
            { duration: 7000 }
          );
        } else if (err.status === 401) {
          localStorage.removeItem('token');
          if (!this.router.url.startsWith('/login')) {
            this.snackBar.open('Session expirée ou non autorisée. Veuillez vous reconnecter.', 'OK', {
              duration: 5000,
            });
            this.router.navigate(['/login']);
          }
        } else if (err.status === 403) {
          this.snackBar.open('Accès refusé (403).', 'Fermer', { duration: 5000 });
        } else if (err.status === 404) {
          this.snackBar.open('Ressource introuvable (404).', 'Fermer', { duration: 4000 });
        } else if (err.status >= 500) {
          this.snackBar.open('Erreur serveur. Réessayez plus tard.', 'Fermer', { duration: 6000 });
        }
        return throwError(() => err);
      })
    );
  }
}
