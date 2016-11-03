import {Service} from "../service";
import {ServiceStatusDetails} from "../service-status-details";

export class ExchangeServiceState extends Service
{
  public constructor(serviceStatusDetails?:ServiceStatusDetails){
    super(serviceStatusDetails);
  }
}
