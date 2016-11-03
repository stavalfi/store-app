import {ServiceStatus} from "./service-status.enum";
/**
 * Created by armyTik on 27/09/2016.
 */
export class ServiceStatusDetails
{
  public constructor(
    public status?:ServiceStatus,
    public updateDate?:number,
    public error?:Error,
    public additionalInfo?:string){}
}
