/**
 * Created by armyTik on 21/09/2016.
 */
import {Injectable} from "@angular/core";
import {Store, Action} from "@ngrx/store";
import {AppState} from "../design/app-state";

@Injectable()
export class GeneralFailuresActions{

  private ID_Count:number=0;
  private currentState:AppState=null;
  constructor(private _state:Store<AppState>)
  {
    this._state.select((state:AppState)=>state).subscribe((state:AppState)=>this.currentState=state);
  }
  //
  //
  public static Add_GENERAL_FAILURE:string="[general failure] adding general failure";
  //
  //
  public addGeneralFailure(failureDetails:string,exception:Error):Action
  {
    return {
      type: GeneralFailuresActions.Add_GENERAL_FAILURE,
      payload:
      {
          ID:this.ID_Count++,
          failureDetails:failureDetails,
          failureDate:Date.now(),
          exception:exception,
          currectState:new AppState(this.currentState.authState,[],this.currentState.shoppingCartDetailsState,this.currentState.serversStatusDetailsState)
      }
    };
  }
  //
  //
}

