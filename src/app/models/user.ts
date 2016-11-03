/**
 * Created by armyTik on 02/08/2016.
 */
export class User{
  constructor(
    public $key:string,
    public email:string,
    public registrationDate:Date,
    public firstName:string,
    public lastName:string,
    public imageUrl:string
  ){}
}
