import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isloginmode = true;
  isloading = false;
  error : string = null;
  constructor(private authservice : AuthService,private router : Router) { }

  ngOnInit() {
  }
  onSwitchMode(){
    this.isloginmode = !this.isloginmode;
  }
  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
    let authobserv : Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;

    this.isloading = true;

    if(this.isloginmode){
     authobserv = this.authservice.login(email,password);
    }
    else{
     authobserv = this.authservice.signup(email,password)
    }
    authobserv.subscribe(resdate => { 
      console.log(resdate);
      this.isloading = false;
      this.router.navigate(['/Form'])
      },
      errormessage =>{
        console.log(errormessage);
        this.error = errormessage;
        this.isloading = false;

      }
      );
    form.reset();
  }
}