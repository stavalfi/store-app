import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {AuthProviders} from "angularfire2";

@Injectable()
export class AuthActions
{
  constructor(){

  }
  //
  //
  public static UPDATE_FIREBASE_AUTH_SUCCESS:string="[Auth] updating firebase auth success";
  public static LOGGING_IN_THROUGH_FIREBASE:string="[Auth] start logging in through firebase...";
  public static LOGGING_IN_THROUGH_FIREBASE_SUCCESS:string="[Auth] logging in through firebase success";
  public static LOGGING_IN_THROUGH_FIREBASE_FAILED:string="[Auth] logging in through firebase failed";
  public static LOGGING_OUT_THROUGH_FIREBASE:string="[Auth] start logging out through firebase...";
  public static LOGGING_OUT_THROUGH_FIREBASE_SUCCESS:string="[Auth] logging out through firebase success";
  public static LOGGING_OUT_THROUGH_FIREBASE_FAILED:string="[Auth] logging out through firebase failed";
  public static LOGGING_IN_SUCCESS:string="[Auth] logging in successed";
  public static LOGGING_IN_FAILED:string="[Auth] logging in failed";
  public static LOGGING_IN:string="[Auth] start logging in...";
  public static LOGGING_OUT_SUCCESS:string="[Auth] logging out successed";
  public static LOGGING_OUT_FAILED:string="[Auth] logging out failed";
  public static LOGGING_OUT:string="[Auth] start logging out...";
  //
  //
  public loggingInThroughFirebase(provider:AuthProviders):Action
  {
    return {
      type: AuthActions.LOGGING_IN_THROUGH_FIREBASE,
      payload:provider
    };
  }
  public loggingInThroughFirebaseSuccess(userEmail:string):Action
  {
    return {
      type: AuthActions.LOGGING_IN_THROUGH_FIREBASE_SUCCESS,
      payload:userEmail
    };
  }
  public loggingInThroughFirebaseFailed(error?:Error,additionalInfo?:string):Action
  {
    return {
      type: AuthActions.LOGGING_IN_THROUGH_FIREBASE_FAILED,
      payload:
      {
        error:error,
        additionalInfo:additionalInfo
      }
    };
  }
  public loggingOutThroughFirebase():Action
  {
    return {
      type: AuthActions.LOGGING_OUT_THROUGH_FIREBASE,
    };
  }
  public loggingOutThroughFirebaseSuccess():Action
  {
    return {
      type: AuthActions.LOGGING_OUT_THROUGH_FIREBASE_SUCCESS
    };
  }
  public loggingOutThroughFirebaseFailed(error?:Error,additionalInfo?:string):Action
  {
    return {
      type: AuthActions.LOGGING_OUT_THROUGH_FIREBASE_FAILED,
      payload:
      {
        error:error,
        additionalInfo:additionalInfo
      }
    };
  }
  public updateFirebaseAuthSuccess():Action
  {
    return {
      type: AuthActions.UPDATE_FIREBASE_AUTH_SUCCESS
    };
  }
  public loggingOutFailed(error?:Error,additionalInfo?:string):Action
  {
    return {
      type: AuthActions.LOGGING_OUT_FAILED,
      payload:
      {
        error:error,
        additionalInfo:additionalInfo
      }
    };
  }
  public loggingOutSuccess():Action
  {
    return {
      type: AuthActions.LOGGING_OUT_SUCCESS
    };
  }
  public loggingOut():Action
  {
    return {
      type: AuthActions.LOGGING_OUT
    };
  }
  public loggingIn():Action
  {
    return {
      type: AuthActions.LOGGING_IN
    };
  }
  public loggingInSuccess():Action
  {
    return {
      type: AuthActions.LOGGING_IN_SUCCESS
    };
  }
  public loggingInFailed(error?:Error,additionalInfo?:string):Action
  {
    return {
      type: AuthActions.LOGGING_IN_FAILED,
      payload:
      {
        error:error,
        additionalInfo:additionalInfo
      }
    };
  }
}

