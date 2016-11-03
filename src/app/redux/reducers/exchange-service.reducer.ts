import {Action} from "@ngrx/store";
import {ServiceStatus} from "../design/services-status-state/service-status.enum";
import {ExchangeServiceState} from "../design/services-status-state/exchange-service-state/exchange-service.state";
import {ExchangeServiceActions} from "../actions/exchage-service.actions";
import {ServiceStatusDetails} from "../design/services-status-state/service-status-details";

let initialState:ExchangeServiceState=
  new ExchangeServiceState(new ServiceStatusDetails(ServiceStatus.CONNECTED,Date.now()));

export const exchangeServiceReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case ExchangeServiceActions.EXCHANGE_SERVICE_CONNECTED:
      return new ExchangeServiceState(new ServiceStatusDetails(ServiceStatus.CONNECTED,Date.now()));
    case ExchangeServiceActions.EXCHANGE_SERVICE_CONNECTING:
      return new ExchangeServiceState(new ServiceStatusDetails(ServiceStatus.CONNECTING,Date.now()));
    case ExchangeServiceActions.EXCHANGE_SERVICE_DISCONNECTED:
      return new ExchangeServiceState(new ServiceStatusDetails(ServiceStatus.DISCONNECTED,action.payload.error,action.payload.additionalInfo));
    default:
      return state;
  }
};
