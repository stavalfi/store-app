import {GeneralStatusDetails} from "./general-status-details";
import {FirebaseAuthStatusDetails} from "./firebase-auth-status-details";

export class AuthState
{
  public constructor(public generalStatusDetails?:GeneralStatusDetails,
                     public firebaseAuthStatusDetails?:FirebaseAuthStatusDetails,
                     public userEmail?:string){}
  public compare(authState:AuthState):boolean
  {
    return this.toString()===authState.toString();
  }
  public toString():string
  {
    let summery:string="";
    if(this.generalStatusDetails!=null)
      summery+="generalStatusDetails: "+this.generalStatusDetails.toString();
    if(this.firebaseAuthStatusDetails!=null)
      summery+="firebaseAuthStatusDetails: "+this.firebaseAuthStatusDetails.toString();
    if(this.userEmail!=null)
      summery+="firebaseAuthStatusDetails: "+this.userEmail.toString();
    return summery;
  }
}
