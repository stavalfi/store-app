import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../redux/design/app-state";
import {AngularFire, AuthProviders} from "angularfire2";
import 'rxjs/add/operator/withLatestFrom';
import {AuthActions} from "../../redux/actions/auth.actions";
import {UserService} from "../../services/user.service";
import {AuthState} from "../../redux/design/auth-state/auth.state";
import {AuthGeneralStatus} from "../../redux/design/auth-state/auth-general-status";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {ProductService} from "../../services/product.service";
import {ShoppingCartState} from "../../redux/design/shopping-cart-state/shopping-cart.state";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit
{
  private authStatus:Observable<AuthGeneralStatus>;
  private loading:Observable<boolean>;
  private shoppingCartAmount$:Observable<number>;
  constructor(private authActions: AuthActions,
              private af: AngularFire,
              private productsService:ProductService,
              private router:Router,
              private route:ActivatedRoute,
              private userService:UserService,
              private store:Store<AppState>){
  }
  public ngOnInit(): void {
    this.authStatus=this.userService.authState$()
      .map((authState:AuthState)=>authState.generalStatusDetails.status);
    this.loading=this.authStatus
      .map((authGeneralStatus:AuthGeneralStatus)=>authGeneralStatus===AuthGeneralStatus.LOGGING_IN || authGeneralStatus===AuthGeneralStatus.LOGGING_OUT);
    this.shoppingCartAmount$=this.productsService
      .shoppingCartState$()
      .map((shoppingCartState:ShoppingCartState)=>shoppingCartState.amount());

  }
  public navigateProfile():void
  {
    this.userService.loggedInUser$()
      .take(1)
      .toPromise()
      .then((loggedInUser:User)=> {
        if (loggedInUser != null)
          this.router.navigate(['account', loggedInUser.$key]);
      });
  }
  public navigateHelp():void
  {
    this.router.navigate(['']);
  }
  public login():void
  {
    this.store.dispatch(this.authActions.loggingIn());
    this.store.dispatch(this.authActions.loggingInThroughFirebase(AuthProviders.Google));
  }
  public logout():void
  {
    this.store.dispatch(this.authActions.loggingOut());
  }
  public navigate(tab:any)
  {
    switch(tab.index) {
      case 0:
        this.router.navigate(['shop']);
        break;
      case 1:
        this.router.navigate(['shop']);
        break;
      case 2:
        this.router.navigate(['/shop/cart']);
        break;
      case 3:
        this.navigateProfile();
        break;
      default:
        this.router.navigate(['']);
        break;

    }
  }
}
