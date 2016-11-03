import {Action} from "@ngrx/store";
import {ExceptionDetails} from "../design/general-failures-state/exception-details";
import {GeneralFailuresActions} from "../actions/general-failures.actions";

let initialState: ExceptionDetails[]=[];

export const generalFailureReducer = (state = initialState, action:Action) => {
  if(action==null) {
    console.log(action);
  }
  //The state is only partial here!! its only the part related to this reducer!//
  switch (action.type) {
    case GeneralFailuresActions.Add_GENERAL_FAILURE:
      return [...state,action.payload as ExceptionDetails];
    default:
      return state;
  }
};
