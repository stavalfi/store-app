import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

@Injectable()
export class ExchangeServiceActions
{
  constructor(){}
  //
  //
  public static EXCHANGE_SERVICE_CONNECTING:string="[servers] [exchange-service] connecting";
  public static EXCHANGE_SERVICE_CONNECTED:string="[servers] [exchange-service] connected";
  public static EXCHANGE_SERVICE_DISCONNECTED:string="[servers] [exchange-service] disconnected";
  //
  //
  public connecting():Action
  {
    return {
      type: ExchangeServiceActions.EXCHANGE_SERVICE_CONNECTING
    };
  }
  public disconnected(error?:Error,additionalInfo?:string):Action
  {
    return {
      type: ExchangeServiceActions.EXCHANGE_SERVICE_DISCONNECTED,
      payload:
      {
        error:error,
        additionalInfo:additionalInfo
      }
    };
  }
  public connected():Action
  {
    return {
      type: ExchangeServiceActions.EXCHANGE_SERVICE_CONNECTED
    };
  }
}
