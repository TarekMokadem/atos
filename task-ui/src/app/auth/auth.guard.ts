import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.snackBar.open('Veuillez vous connecter pour accéder à cette page.', 'OK', { duration: 4000 });
    this.router.navigate(['/login']);
    return false;
  }
}
