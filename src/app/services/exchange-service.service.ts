import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';
import {AppState} from "../redux/design/app-state";
import {Store} from "@ngrx/store";
import {ExchangeServiceState} from "../redux/design/services-status-state/exchange-service-state/exchange-service.state";
import {ExchangeServiceActions} from "../redux/actions/exchage-service.actions";
import {ServiceStatus} from "../redux/design/services-status-state/service-status.enum";

@Injectable()
export class ExchangeServiceService
{
  private URL:string="http://api.fixer.io/latest";
  private _currentEuroValueAsShekel$:Observable<number>;
  private _exchangeServiceState$:Observable<ExchangeServiceState>;
  constructor(private http:Http,
              private store:Store<AppState>,
              private exchangeServiceActions:ExchangeServiceActions){}
  //
  public exchangeServiceState$():Observable<ExchangeServiceState>
  {
    if(this._exchangeServiceState$==null)
      this._exchangeServiceState$= this.store.select((state:AppState)=>state["serversStatusState"].exchangeServiceState);
    return this._exchangeServiceState$;
  }
  public currentEuroValueAsShekel$():Observable<number>
  {
    if(this._currentEuroValueAsShekel$==null)
      this._currentEuroValueAsShekel$= this.exchangeServiceState$()
        .filter((exchangeServiceState:ExchangeServiceState)=>exchangeServiceState.serviceStatusDetails.status===ServiceStatus.CONNECTED)
        .switchMap((exchangeServiceState:ExchangeServiceState)=>this.http.get(this.URL))
        .map((res:Response)=>res.json().rates.ILS)
        .catch((error:Error)=>
        {
          this.store.dispatch(this.exchangeServiceActions.disconnected(error,"ExchangeServiceService.currentEuroValueAsShekel$()"));
          return this._currentEuroValueAsShekel$;
        })
        .share();
    return this._currentEuroValueAsShekel$;
  }
  public disconnect():void
  {
    this.store.dispatch(this.exchangeServiceActions.disconnected(undefined,"menual disconnect"));
  }
  public ping():Observable<any>
  {
    return this.http.get(this.URL);
  }
}
