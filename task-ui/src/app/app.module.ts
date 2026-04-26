import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';

import { DemandeModule } from './demande/demande.module';
import {LoginComponent} from "./layouts/login/login.component";
import {LeaveManagementComponent} from "./user-view-management/leave-management/leave-management.component";
import {TaskManagementComponent} from "./user-view-management/task-management/task-management.component";
import {UserManagementComponent} from "./user-view-management/user-management/user-management.component";
import {HomeComponent} from "./layouts/home/home.component";
import {AdminPanelComponent} from "./layouts/admin-panel/admin-panel.component";
import {AdminLeaveManagementComponent} from "./admin-view-management/leave-management/admin-leave-management.component";
import {AdminTaskManagementComponent} from "./admin-view-management/task-management/admin-task-management.component";
import {AdminUserManagementComponent} from "./admin-view-management/user-management/admin-user-management.component";
import {
  TaskDialogContentComponent
} from "./admin-view-management/task-management/component/dialog-content/task-dialog-content.component";
import {
  UserDialogContentComponent
} from "./admin-view-management/user-management/component/dialog-content/user-dialog-content.component";
import {
  LeaveDialogContentComponent
} from "./admin-view-management/leave-management/component/dialog-content/leave-dialog-content.component";

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtHelperService  } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './demande/demande-list/popup/popup.component';
import {LivraisonComponent} from "./admin-view-management/livraison/livraison.component";
import {
  UserTaskDialogContentComponent
} from "./user-view-management/task-management/component/dialog-content/user-task-dialog-content.component";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {
  UserLeaveDialogContentComponent
} from "./user-view-management/leave-management/component/dialog-content/leave-dialog-content.component";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input-gg";
import {UserLivraisonComponent} from "./user-view-management/livraison/user-livraison.component";
import {
  UserResponsableLeaveDialogContentComponent
} from "./admin-view-management/task-management/component/dialog-content-responsable/responsable-leave-dialog-content.component";
import {
  UserStatutLeaveDialogContentComponent
} from "./admin-view-management/task-management/component/dialog-content-statut/statut-leave-dialog-content.component";
import { API_BASE_URL } from '../environments/api-base-url';
import { DemoBannerComponent } from './components/demo-banner/demo-banner.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    HomeComponent,
    LoginComponent,
    LeaveManagementComponent,
    TaskManagementComponent,
    UserManagementComponent,
    AdminPanelComponent,
    AdminLeaveManagementComponent,
    AdminTaskManagementComponent,
    AdminUserManagementComponent,
    TaskDialogContentComponent,
    LeaveDialogContentComponent,
    UserDialogContentComponent,
    PopupComponent,
    LivraisonComponent,
    UserTaskDialogContentComponent,
    UserLeaveDialogContentComponent,
    UserLivraisonComponent,
    UserResponsableLeaveDialogContentComponent,
    UserStatutLeaveDialogContentComponent,
    DemoBannerComponent
  ],
    imports: [
        MatDialogModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        NgxIntlTelInputModule,
        DashboardModule,
        ComponentsModule,
        FormsModule,
        DemandeModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: [new URL(API_BASE_URL).host],
            disallowedRoutes: [
              `${API_BASE_URL}/auth/login`,
              `${API_BASE_URL}/auth/register`,
            ],
          },
        }),

    ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
