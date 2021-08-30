import { HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData { 
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered?: boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService{
  user= new BehaviorSubject<User>(null);
  private tokenexpirationTimer : any;

constructor(private http : HttpClient ,private router : Router){

}

signup(email : string , password : string){
 return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCW20kI9yt3mQzH5zeJ14F73ggsBAHFHQI' ,{

      email : email,
      password : password,
      returnSecureToken : true
  }).pipe(catchError(this.handleerror),tap(resdata =>{
        this.handleauthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn);
  }));
}
autologin(){
 const userdata:{
   email:string;
   id:string;
   _token : string;
   _tokenexpirationdate : string;
 } = JSON.parse(localStorage.getItem('userdata'));
 if(!userdata){
   return;
 }
 const loadeduser =new User(userdata.email,userdata.id,userdata._token,new Date(userdata._tokenexpirationdate));

 if(loadeduser){
   const expirationDuration = new Date(userdata._tokenexpirationdate).getTime() - new Date().getTime();
   this.user.next(loadeduser);
   this.autologout(expirationDuration);
 }
}

  login(email : string , password : string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCW20kI9yt3mQzH5zeJ14F73ggsBAHFHQI',
       {
        email : email,
        password : password,
        returnSecureToken : true
       }
       ).pipe(catchError(this.handleerror),tap(resdata =>{
        this.handleauthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn);
  }));
}
logout(){
   this.user.next(null);
   this.router.navigate(['/auth']);
   localStorage.removeItem('userdata');
   if(this.tokenexpirationTimer){
       clearTimeout(this.tokenexpirationTimer);
   }
   this.tokenexpirationTimer = null;
}
autologout(expirationdate : number){
    setTimeout(()=>{
      this.tokenexpirationTimer=  this.logout();
    },200000)
}
  private handleauthentication (email : string,userId : string,token : string,expiresIn : number){
    const expirationdate = new Date(
      new Date().getTime() + expiresIn * 1000);
    const user =new User(
    email,
    userId,
    token,
    expirationdate
    );
    this.user.next(user);
    this.autologout(expiresIn *1000)
    localStorage.setItem('userdata',JSON.stringify(user));
  }
  private handleerror(errorres : HttpErrorResponse){
    let errormessage = 'An unknown error message is occured!';
     if(!errorres.error || !errorres.error.error){
          return throwError(errormessage);
     }

    switch(errorres.error.error.message){
      case 'EMAIL_EXISTS':
       errormessage ='Email is already exists';
       case 'EMAIL_NOT_FOUND':
       errormessage ='Email is doesnot exists';
       case 'INVALID_PASSWORD':
       errormessage ='password is Invalid ';
    }
    return throwError(errormessage);
  }
}