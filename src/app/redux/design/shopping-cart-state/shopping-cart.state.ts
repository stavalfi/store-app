import {ProductFromCart} from "./product-from-cart";

export class ShoppingCartState
{
  public constructor(public products?: ProductFromCart[]){}
  public amount():number
  {
    let sum:number=0;
    for(let i:number=0;i<this.products.length;i++)
      sum+=this.products[i].amount;
    return sum;
  }
}
