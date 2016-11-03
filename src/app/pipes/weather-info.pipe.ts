import {Pipe,PipeTransform} from '@angular/core'

@Pipe({
  name: 'weatherInfo',
  pure: false
})
export class WeatherPipe implements PipeTransform
{
  public transform(weatherInfo:any):string
  {
    if( weatherInfo == null)
      return "wtf";
    if( weatherInfo == null || !this.contains(weatherInfo,"name") || !this.contains(weatherInfo,"weather"))
      return "something is wrong";
    return "ssssss";
    //return weatherInfo.name+": "+weatherInfo.weather[0].description;
  }
  private contains(value:any,filterValue:string):boolean {
    let object1:any;
    if(typeof value!==typeof {} && typeof value!== typeof Object)
      object1={value:value};
    else
      object1=value;
    for (let key in object1) {
      if (typeof object1[key] === 'object')
        if (this.contains(object1[key], filterValue))
          return true;
      if(object1[key].toString().indexOf(filterValue) > -1)
        return true;
    }
    return false;
  }
}
