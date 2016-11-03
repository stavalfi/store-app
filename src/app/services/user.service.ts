import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {AppState} from "../redux/design/app-state";
import {Store} from "@ngrx/store";
import {AuthState} from "../redux/design/auth-state/auth.state";
import {AuthGeneralStatus} from "../redux/design/auth-state/auth-general-status";
import {AuthFirebaseStatus} from "../redux/design/auth-state/auth-firebase-status";
import {AuthActions} from "../redux/actions/auth.actions";
import {User} from "../models/user";

@Injectable()
export class UserService {

  private _users$:Observable<User[]>;
  private _isAnyUserConnected$:Observable<boolean>;
  private _authState$:Observable<AuthState>;
  private _loggedInUser$:Observable<User>;
  //
  constructor(private af: AngularFire,
              private loggingActions: AuthActions,
              private store:Store<AppState>){}
  public create(email:string,firstName:string,lastName:string,imageUrl:string):void
  {
    this.af.database.list('/users').push({
      email: email,
      registrationDate: Date.now(),
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl
    });
  }
  public users$():Observable<User[]>{
    if(this._users$==null)
      this._users$=this.af.database.list('/users');
    return this._users$;
  }
  public update(key:string,updateObject:any):void
  {
    this.af.database.object('/users/'+key).update(updateObject);
  }
  public userByKey$(key:string):Observable<User>
  {
    return this.af.database.object('/users/'+key);
  }
  public userByEmail$(userEmail:string):Observable<User>
  {
    return this.users$()
      .map((users:any[])=>users.filter(user=>user.email===userEmail))
      .filter((users:any[])=>users.length===1)
      .map((users:any[])=>users[0].$key)
      .switchMap((userKey:string)=>this.userByKey$(userKey));
  }
  public isAnyUserLoggedIn$():Observable<boolean> {
    if(this._isAnyUserConnected$==null)
      this._isAnyUserConnected$=this.authState$()
        .map((authState: AuthState)=>authState.generalStatusDetails.status===AuthGeneralStatus.LOGGING_IN_SUCCESS);
    return this._isAnyUserConnected$;
  }
  public authState$():Observable<AuthState>
  {
    if(this._authState$==null)
      this._authState$=this.store
        .select("authState")
        .map((authState: any)=><AuthState>authState);
    return this._authState$;
  }
  public loggedInUser$():Observable<User>
  {
    if(this._loggedInUser$==null)
      this._loggedInUser$=this.authState$()
        .switchMap((authState: AuthState)=>{
          if(authState.generalStatusDetails.status===AuthGeneralStatus.LOGGING_IN_SUCCESS)
            return this.userByEmail$(authState.userEmail);
          else
            return Observable.of(null);
        })
    return this._loggedInUser$;
  }
}
