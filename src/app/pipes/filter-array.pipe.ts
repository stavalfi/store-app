/**
 * Created by armyTik on 06/08/2016.
 */

import {Pipe,PipeTransform} from '@angular/core'

@Pipe({
  name: 'filterArray',
  pure: false
})
export class FilterArrayPipe implements PipeTransform
{
  public transform(array:{}[],filterValue:string):{}[]
  {
    if( array== null || filterValue==null)
      return array;
    if(filterValue==='')
      return array;
    return array.filter(item1=>this.contains(item1,filterValue));
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
