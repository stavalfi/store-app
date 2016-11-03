import {Action} from "@ngrx/store";
import {AuthState} from "../design/auth-state/auth.state";
import {AuthGeneralStatus} from "../design/auth-state/auth-general-status";
import {GeneralStatusDetails} from "../design/auth-state/general-status-details";
import {AuthActions} from "../actions/auth.actions";
import {FirebaseAuthStatusDetails} from "../design/auth-state/firebase-auth-status-details";
import {AuthFirebaseStatus} from "../design/auth-state/auth-firebase-status";
import {AuthProviders} from "angularfire2";

let initialState: AuthState=new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_OUT_SUCCESS));
//
export const authReducer = (lastState = initialState, action:Action):AuthState => {
  switch (action.type) {
    //
    //authGeneralStatus:
    //
    case AuthActions.LOGGING_IN:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_IN,Date.now()));
    }
    case AuthActions.LOGGING_IN_FAILED:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_IN_FAILED,Date.now(),
        action.payload.error,action.payload.additionalDetails),
        lastState.firebaseAuthStatusDetails);
    }
    case AuthActions.LOGGING_IN_SUCCESS:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_IN_SUCCESS,Date.now()),
        lastState.firebaseAuthStatusDetails,lastState.userEmail);
    }
    case AuthActions.LOGGING_OUT:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_OUT,Date.now()),
        lastState.firebaseAuthStatusDetails,lastState.userEmail);
    }
    case AuthActions.LOGGING_OUT_FAILED:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_OUT_FAILED,Date.now(),
        action.payload.error,action.payload.additionalDetails),
        lastState.firebaseAuthStatusDetails);

    }
    case AuthActions.LOGGING_OUT_SUCCESS:
    {
      return new AuthState(new GeneralStatusDetails(AuthGeneralStatus.LOGGING_OUT_SUCCESS,Date.now()),
        lastState.firebaseAuthStatusDetails);
    }
    //
    //authFirebaseStatus:
    //
    case AuthActions.UPDATE_FIREBASE_AUTH_SUCCESS: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.UPDATE_AUTH_SUCCESS,Date.now(),
          undefined,undefined,lastState.firebaseAuthStatusDetails.provider),lastState.userEmail);

    }
    case AuthActions.LOGGING_IN_THROUGH_FIREBASE: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_IN,Date.now(),
          undefined,undefined,action.payload));
    }
    case AuthActions.LOGGING_IN_THROUGH_FIREBASE_SUCCESS: {
      let provider: AuthProviders = lastState.firebaseAuthStatusDetails == null ? undefined : lastState.firebaseAuthStatusDetails.provider;
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_IN_SUCCESS,Date.now(),
          undefined, undefined, provider), action.payload);
    }
    case AuthActions.LOGGING_IN_THROUGH_FIREBASE_FAILED: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_IN_FAILED,Date.now(),
          action.payload.error,action.payload.additionalDetails,lastState.firebaseAuthStatusDetails.provider),lastState.userEmail);
    }
    case AuthActions.LOGGING_OUT_THROUGH_FIREBASE: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_OUT,Date.now(),
          undefined,undefined,lastState.firebaseAuthStatusDetails.provider),lastState.userEmail);
    }
    case AuthActions.LOGGING_OUT_THROUGH_FIREBASE_SUCCESS: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_OUT_SUCCESS,Date.now(),
          undefined,undefined,lastState.firebaseAuthStatusDetails.provider),action.payload);

    }
    case AuthActions.LOGGING_IN_THROUGH_FIREBASE_FAILED: {
      return new AuthState(lastState.generalStatusDetails,
        new FirebaseAuthStatusDetails(AuthFirebaseStatus.LOGGING_OUT_FAILED,Date.now(),
          action.payload.error,action.payload.additionalDetails,lastState.firebaseAuthStatusDetails.provider),lastState.userEmail);
    }
    default:
      return lastState;
  }
};
