import {AuthGeneralStatus} from "./auth-general-status";
export class GeneralStatusDetails
{
  public constructor(public status?:AuthGeneralStatus,
                     public updateDate?:number,
                     public error?:Error,
                     public additionalInfo?:string){}
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
    return summery;
  }
}
