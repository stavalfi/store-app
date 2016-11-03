import {AppState} from "../app-state";

export class ExceptionDetails
{
  public constructor(public ID:string,
                     public failureDetails?:string,
                     public failureDate?:number,
                     public exception?:Error,
                     public currectState?:AppState){
  }
}
