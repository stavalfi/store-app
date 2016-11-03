export class Product{
  constructor(
    public $key:string,
    public categoryKey:string,
    public name:string,
    public creationDate:Date,
    public price:number,
    public details:string,
    public imageUrl:string,
    public supplierKey:string
  ){}
}
