import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormComponent } from './form/form.component';
import { TablesComponent } from './tables/tables.component';
import { UpdateFormComponent } from './update-form/update-form.component';

const appRoutes :  Routes = [ 
  {path: '' , redirectTo : '/auth', pathMatch : 'full'},
  {path  : 'Form',component : FormComponent,canActivate : [AuthGuard]},
  {path : 'Tables',component : TablesComponent,canActivate : [AuthGuard]},
  {path : 'update/:id',component : UpdateFormComponent,canActivate : [AuthGuard]},
  {path : 'auth' , component : AuthComponent},
  {path  : 'contact',component : ContactFormComponent,canActivate : [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]


})

export class AppRoutingModule { }