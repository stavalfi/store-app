import {Injectable} from "@angular/core";
import {Effect, Actions} from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/switchMap';
import {AuthActions} from "../actions/auth.actions";
import {Action, Store} from "@ngrx/store";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {AppState} from "../design/app-state";
import {GeneralFailuresActions} from "../actions/general-failures.actions";
import {ShoppingCartActions} from "../actions/shopping-cart.actions";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2";
import {AuthState} from "../design/auth-state/auth.state";
import {User} from "../../models/user";
//
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private store:Store<AppState>,
              private generalFailureActions:GeneralFailuresActions,
              private authActions: AuthActions,
              private af: AngularFire,
              private ShoppingCartActions:ShoppingCartActions,
              private userService: UserService) {
    this.checkIfUserLoggedIn();
  }

  //effects:


  @Effect()
  public loggingOut$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_OUT)
    .map((action:Action)=>this.authActions.loggingOutThroughFirebase())
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingOut$", error)));

  @Effect()
  public loggingOutFailed$:Observable<Action> = this.distinctAuthState$(AuthActions.LOGGING_OUT_FAILED)
    .map((action: Action)=>this.generalFailureActions.addGeneralFailure(action.payload.additionalInfo, action.payload.error))
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingOutFailed$", error)));

  @Effect()
  public loggingInThroughFirebaseSuccess$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_IN_THROUGH_FIREBASE_SUCCESS)
    .switchMap((action:Action)=>this.af.auth.take(1))
    .do((auth:any)=>this.createNewUserIfNotExist(auth))
    .map((action:Action)=>this.authActions.loggingInSuccess())
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingInThroughFirebaseSuccess$", error)));

  @Effect()
  public loggingInThroughFirebaseFailed$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_IN_THROUGH_FIREBASE_FAILED)
    .map((action:Action)=>this.authActions.loggingInFailed(undefined,"[Auth] logging in through firebase failed."))
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingInThroughFirebaseFailed$", error)));

  @Effect()
  public loggingOutThroughFirebase$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_OUT_THROUGH_FIREBASE)
    .do((action: Action)=>this.af.auth.logout())
    .map((action: Action)=>this.authActions.loggingOutThroughFirebaseSuccess())
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingOutThroughFirebase$", error)));

  @Effect()
  public loggingOutThroughFirebaseFailed$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_OUT_THROUGH_FIREBASE_FAILED)
    .do((action: Action)=>this.store.dispatch(this.ShoppingCartActions.clearShoppingCart()))
    .switchMap((action:Action)=>Observable.of(this.generalFailureActions.addGeneralFailure(action.payload.additionalInfo, action.payload.error),
        this.authActions.loggingOutFailed(action.payload.additionalInfo, action.payload.error)))
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingOutThroughFirebaseFailed$", error)));

  @Effect()
  public loggingOutThroughFirebaseSuccess$:Observable<Action>=this.distinctAuthState$(AuthActions.LOGGING_OUT_THROUGH_FIREBASE_SUCCESS)
    .switchMap((action: Action)=>Observable.of(this.ShoppingCartActions.clearShoppingCart(),this.authActions.loggingOutSuccess()))
    .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingOutThroughFirebaseSuccess$", error)));

  @Effect()
  public loggingInThroughFirebase$:Observable<Action>=
    this.distinctAuthState$(AuthActions.LOGGING_IN_THROUGH_FIREBASE)
      .switchMap((action:Action)=>this.logInThroughtFirebase())
      .map((auth:any)=>{
        if(auth!=null)
          return this.authActions.loggingInThroughFirebaseSuccess(auth.auth.email);
        else
          return this.authActions.loggingInThroughFirebaseFailed(undefined,"auth object is null");
      })
      .catch((error:Error)=>Observable.of(this.generalFailureActions.addGeneralFailure("AuthEffects.loggingInThroughFirebase$", error)));
  ///
  ///private helper fucntions:
  ///
  private checkIfUserLoggedIn():void
  {
    this.af.auth.take(1)
      .subscribe((auth:any)=>{
      if(auth!=null)
        this.store.dispatch(this.authActions.loggingInThroughFirebaseSuccess(auth.auth.email));
      });
  }
  private distinctAuthState$(ofType:string):Observable<Action>
  {
    return this.actions$
      .ofType(ofType);
  }
  private logInThroughtFirebase():Observable<any>
  {
    let authObject:Promise<any>=this.userService.authState$()
      .take(1).toPromise()
      .then((authState: AuthState)=>this.af.auth.login({
        provider:authState.firebaseAuthStatusDetails.provider,
        method:AuthMethods.Popup
      }));
    return Observable.fromPromise(authObject);
  }
  private createNewUserIfNotExist(authObject:any):Promise<void>
  {
    return this.userService.users$()
      .take(1)
      .toPromise()
      .then((users:User[])=>users.filter(user=>user.email===authObject.auth.email))
      .then((users:User[])=>{
        if(users.length===0)
          this.userService.create(
            authObject.auth.email,
            this.getFirstName(authObject.auth.displayName),
            this.getLastName(authObject.auth.displayName),
            authObject.auth.photoURL
          );
      });
  }
  private getFirstName(displayName:string):string
  {
    let spaceIndex=displayName.search(' ');
    return displayName.slice(0,spaceIndex);
  }
  private getLastName(displayName:string):string
  {
    let spaceIndex=displayName.search(' ');
    return displayName.slice(spaceIndex+1);
  }
}
