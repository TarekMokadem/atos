import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  currentUser: any;


  onBack(): void {
    this.authService.logout();

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private _router: Router, private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated() ? this.currentUser = this.authService.getUser() : this.currentUser = null;
    console.log(this.currentUser);
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "task",
      icon: "task_alt",
      menu: "Tâches",
    },
    {
      link: "leave",
      icon: "holiday_village",
      menu: "Congés",
    },
    {
      link: "user",
      icon: "account_circle",
      menu: "Utilisateurs",
    },
    {
      link: "livraison",
      icon: "local_shipping",
      menu: "Livraison",
    },
    {
      link: "demande-acces",
      icon: "vpn_key",
      menu: "Demande d'accès",
    },
    {
      link: "demande-flux",
      icon: "fence",
      menu: "Demande d'ouverture de flux",
    },
    {
      link: "demande-list",
      icon: "format_list_bulleted",
      menu: "Mes demandes",
    }
  ]

}
