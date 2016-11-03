import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/ignoreElements';
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {ExchangeServiceActions} from "../actions/exchage-service.actions";
import {ExchangeServiceService} from "../../services/exchange-service.service";

@Injectable()
export class ExchangeServiceEffects
{
  constructor(private actions$: Actions,
              private exchangeServiceService:ExchangeServiceService,
              private exchangeServiceActions:ExchangeServiceActions){}
  //

  //effects:
  @Effect()
  public disconncted$:Observable<Action>=this.actions$
    .ofType(ExchangeServiceActions.EXCHANGE_SERVICE_DISCONNECTED)
    .map((action:Action)=>this.exchangeServiceActions.connecting());

  @Effect()
  public connecting$:Observable<Action>=this.actions$
    .ofType(ExchangeServiceActions.EXCHANGE_SERVICE_CONNECTING)
    .delay(1000)
    .switchMap((action:Action)=>this.exchangeServiceService.ping())
    .map((action:Action)=>this.exchangeServiceActions.connected())
    .retry();

}
