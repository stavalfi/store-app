import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthEffects} from "../../redux/effects/auth.effects";
import {UserService} from "../../services/user.service";

@Injectable()
export class IsAnyUserLoggedInGuard implements CanActivate{
  constructor(private loggingEffects:AuthEffects,
              private userService: UserService,
              private router:Router) { }
  //
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.userService.isAnyUserLoggedIn$()
      .do((anyUserLoggedIn:boolean)=>{
        if(!anyUserLoggedIn)
          this.router.navigate(['']);
      }).take(1);
  }
}
