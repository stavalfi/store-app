import {ServicesStatusState} from "../design/services-status-state/services-status.state";
import {Action} from "@ngrx/store";
import {exchangeServiceReducer} from "./exchange-service.reducer";


let initialState: ServicesStatusState=new ServicesStatusState();

export const serversStatusReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    default:
      return new ServicesStatusState(exchangeServiceReducer(state.exchangeServiceState,action));
  }
};
