import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { slideInAnimation } from './animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations : [
    slideInAnimation

  //   trigger( 'fade',[
  //     transition('void =>*',[
  //       style({
  //         //  backgroundcolor:'yellow',
  //         opacity : 0
  //       }),
  //       animate(2000,style({
  //         // backgroundcolor:'white',
  //         opacity : 1
  //       }))
  //     ])
  //   ])
  ]
})
export class HeaderComponent implements OnInit ,OnDestroy{
  @HostBinding('@.disabled')
  isAuthenticated = false;
  public animationsDisabled = false;
  private userSub : Subscription;
  constructor(private authservice : AuthService) { }

  ngOnInit() {
    this.userSub = this.authservice.user.subscribe(user =>{
    this.isAuthenticated = !!user;
    console.log(!user);
    console.log(!!user);
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onlogout(){
    this.authservice.logout();
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
}