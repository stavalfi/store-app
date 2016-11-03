import {AuthFirebaseStatus} from "./auth-firebase-status";
import {AuthProviders} from "angularfire2";
export class FirebaseAuthStatusDetails
{
  public constructor(public status?:AuthFirebaseStatus,
                     public updateDate?:number,
                     public error?:Error,
                     public additionalInfo?:string,
                     public provider?:AuthProviders){}
  public toString():string
  {
    let summery:string="";
    if(this.status!=null)
      summery+="status: "+this.status.toString();
    if(this.error!=null)
      summery+="error: "+this.error.toString();
    if(this.updateDate!=null)
      summery+="updateDate: "+this.updateDate.toString();
    if(this.additionalInfo!=null)
      summery+="additionalInfo: "+this.additionalInfo.toString();
    if(this.provider!=null)
      summery+="provider: "+this.provider.toString();
    return summery;
  }
}
