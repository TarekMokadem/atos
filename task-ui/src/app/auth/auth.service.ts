import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_BASE_URL } from '../../environments/api-base-url';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = API_BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(JwtHelperService) private jwtHelper: JwtHelperService,
    private readonly snackBar: MatSnackBar
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open('Connexion réussie.', 'OK', { duration: 2500 });
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin-panel']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.snackBar.open(
          'Identifiants incorrects ou compte indisponible. Utilisez les comptes de démonstration si besoin.',
          'Fermer',
          { duration: 7000 }
        );
      },
    });
  }
  signup(credentials: { email: string; password: string; name: string; equipe: string; domaine: string; mobile: string }) {
    return this.http.post(`${this.apiUrl}/auth/register`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
  getUser() {
    const token = localStorage.getItem('token');
    return token != null ? this.jwtHelper.decodeToken(token) : null;
  }
}
