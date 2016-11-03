/**
 * Created by armyTik on 02/08/2016.
 */
export class Category{
  constructor(
    public $key:string,
    public name:string,
    public creationDate:Date,
    public details:string,
    public imageUrl:string
  ){}
}
