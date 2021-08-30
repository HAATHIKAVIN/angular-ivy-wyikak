import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { TablesComponent } from './tables/tables.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnersComponent } from './loading-spinners/loading-spinners.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { UpdateFormComponent } from './update-form/update-form.component';
import { FilterPipe } from './tables/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule ,AppRoutingModule,ReactiveFormsModule,BrowserAnimationsModule],
  declarations: [ AppComponent,HeaderComponent,FormComponent,TablesComponent ,LoadingSpinnersComponent,AuthComponent,UpdateFormComponent,FilterPipe,ContactFormComponent],

  providers:[
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi : true}
  ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
