import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {CategoryService} from "../../services/category.service";
import {AppState} from "../../redux/design/app-state";
import {Store} from "@ngrx/store";

@Injectable()
export class IsCategoryExistGuard implements CanActivate{
  constructor(private categoryService:CategoryService,
              private router:Router) { }
  //
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let categoryKey=route.params["categoryKey"];
    if(categoryKey==null)
      return Observable.of(true);
    return this.categoryService.isExist$(categoryKey)
      .do((isExist:boolean)=>
      {
        if(!isExist)
          this.router.navigate(['shop']);
      }).take(1);
  }
}
