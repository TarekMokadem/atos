import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials);
  }



/*
  username = new FormControl('');
  password = new FormControl('');


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private _router: Router,private breakpointObserver: BreakpointObserver,private authService: AuthService) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
  ]


  checked = true;


  ngOnInit(): void {}

  login(): void {
    if (this.username.value == "admin" && this.password.value == "admin"){
      this._router.navigate(['/admin-panel']);
    } else {
      this._router.navigate(['/home']);
    }

  }*/

}
