import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req  :HttpRequest<any>,next : HttpHandler){
    return this.authservice.user.pipe(take(1),exhaustMap(user =>{
      if(!user){
        return next.handle(req);
      }
      const modifiedreq = req.clone({
        params : new HttpParams().set('auth',user.token)
      })
      return next.handle(modifiedreq);
    }));
    
  }
  constructor(private authservice : AuthService){

  }
}