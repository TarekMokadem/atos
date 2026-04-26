import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { email: '', password: '' };

  readonly demoMode = environment.demoMode;
  readonly demoAccounts = environment.demoAccounts;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials);
  }

  applyDemo(kind: 'admin' | 'user'): void {
    if (!this.demoMode) {
      return;
    }
    const acc = this.demoAccounts[kind];
    this.credentials.email = acc.email;
    this.credentials.password = acc.password;
  }

}
