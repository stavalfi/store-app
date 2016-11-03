import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import {GeneralFailuresActions} from "../actions/general-failures.actions";
import {Action} from "@ngrx/store";
import {ExceptionDetails} from "../design/general-failures-state/exception-details";

@Injectable()
export class GeneralFailuresEffects
{
  constructor(private actions$: Actions){}
  //
  @Effect({dispatch: false})
  private currentPage$ =this.actions$
    .ofType(GeneralFailuresActions.Add_GENERAL_FAILURE)
    .map((action:Action)=>action.payload)
    .do((generalFailure:ExceptionDetails)=> {
      let details: string = "------------------------------------------";
      details += "\n" + "General Failure ID: " + generalFailure.ID + "\n"
      details += "general details: " + generalFailure.failureDetails + "\n"
      if (generalFailure.exception != null) {
        details += "exception name: " + generalFailure.exception.name + "\n"
        details += "exception massage: " + generalFailure.exception.message + "\n"
        details += "exception stack: " + generalFailure.exception.stack + "\n"
      }
      details+="state:"+"\n"
      details+=JSON.stringify(generalFailure.currectState)+"\n"
      console.log(details+"------------------------------------------");
    });
}
