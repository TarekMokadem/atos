import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';


//import { UserCategoryComponent } from './dashboard/dashboard-components/user-category/user-category.component';
import { DemandeComponent } from './demande/demande.component';
import { UserCategoryComponent } from './demande/user-category/user-category.component';
import { DemandeAccesComponent } from './demande/demande-acces/demande-acces.component';
import { DemandeFluxComponent } from './demande/demande-flux/demande-flux.component';
import { DemandeListComponent } from './demande/demande-list/demande-list.component';
import {LoginComponent} from "./layouts/login/login.component";
import {TaskManagementComponent} from "./user-view-management/task-management/task-management.component";
import {LeaveManagementComponent} from "./user-view-management/leave-management/leave-management.component";
import {UserManagementComponent} from "./user-view-management/user-management/user-management.component";
import {HomeComponent} from "./layouts/home/home.component";
import {AdminPanelComponent} from "./layouts/admin-panel/admin-panel.component";
import {AdminUserManagementComponent} from "./admin-view-management/user-management/admin-user-management.component";
import {AdminLeaveManagementComponent} from "./admin-view-management/leave-management/admin-leave-management.component";
import {AdminTaskManagementComponent} from "./admin-view-management/task-management/admin-task-management.component";
import {LivraisonComponent} from "./admin-view-management/livraison/livraison.component";

import { AuthGuard } from './auth/auth.guard';
import {UserLivraisonComponent} from "./user-view-management/livraison/user-livraison.component";

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {path:"", redirectTo:"task", pathMatch:"full"},

      {path:"task", component:TaskManagementComponent},
      {path:"leave", component:LeaveManagementComponent},
      {path:"user", component:UserManagementComponent},
      {path:"livraison", component:UserLivraisonComponent},


      {path:"user-category", component:UserCategoryComponent},
      {path:"demande-acces", component:DemandeAccesComponent},
      {path:"demande-flux", component:DemandeFluxComponent},
      {path:"demande-list", component:DemandeListComponent},

      {path:"dashboard", component:DashboardComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
    ]
  },{
    path:"admin-panel",
    component:AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {path:"", redirectTo:"task", pathMatch:"full"},

      {path:"task", component:AdminTaskManagementComponent,canActivate: [AuthGuard] },
      {path:"leave", component:AdminLeaveManagementComponent},
      {path:"user", component:AdminUserManagementComponent},
      {path:"livraison", component:LivraisonComponent},

      {path:"user-category", component:UserCategoryComponent},
      {path:"demande-acces", component:DemandeAccesComponent},
      {path:"demande-flux", component:DemandeFluxComponent},
      {path:"demande-list", component:DemandeListComponent},
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path:"admin-panel/", redirectTo:"admin-panel/task", pathMatch:"full"},
  {path:"admin-panel/**", redirectTo:"admin-panel/task", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
