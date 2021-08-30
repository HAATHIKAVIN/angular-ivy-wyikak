import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, pipe } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn :'root'})
export class AuthGuard implements CanActivate{
  
  constructor(private authservice : AuthService,private router : Router){

  }

  canActivate(route : ActivatedRouteSnapshot,Router : RouterStateSnapshot): boolean | UrlTree | Promise<boolean> |UrlTree | Observable<boolean> | UrlTree{
       return this.authservice.user.pipe(take(1), map(user =>{
            const isAuth =  !!user;
            if(isAuth){
              return true
            }
            this.router.createUrlTree(['/auth'])
          })
          // ,tap(isAuth =>{
          //     if(!isAuth){
          //       this.router.navigate(['/auth']);
          //     }
          // })
          );
    
  }
}