import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()

export class DateService
{
  private URL:string="http://timeapi.org/utc/now";
  constructor(private http:Http){}
  public currentDate():Observable<string>
  {
    return Observable.interval(1000)
      .switchMap(index=>this.http.get(this.URL))
      .catch(error=>{
        console.log(error);
        return Observable.throw(error.json());
      })
      .share();
  }
}
