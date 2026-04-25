import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DemandeComponent } from './demande.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FeatherModule } from 'angular-feather';
import { AppRoutingModule } from '../app-routing.module';

import { UserCategoryComponent } from './user-category/user-category.component';
import { DemandeAccesComponent } from './demande-acces/demande-acces.component';
import { DemandeFluxComponent } from './demande-flux/demande-flux.component';
import { DemandeListComponent } from './demande-list/demande-list.component';



@NgModule({
  declarations: [
    DemandeComponent,
    UserCategoryComponent,
    DemandeAccesComponent,
    DemandeFluxComponent,
    DemandeListComponent
    
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FeatherModule,
    AppRoutingModule
  ],
  exports: [
    DemandeComponent,
    UserCategoryComponent,
    DemandeAccesComponent,
    DemandeFluxComponent,
    DemandeListComponent
  ]
})
export class DemandeModule { }
