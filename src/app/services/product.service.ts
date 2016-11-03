import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {CategoryService} from "./category.service";
import {ShoppingCartState} from "../redux/design/shopping-cart-state/shopping-cart.state";
import {AppState} from "../redux/design/app-state";
import {Store} from "@ngrx/store";
import {ProductFromCart} from "../redux/design/shopping-cart-state/product-from-cart";

@Injectable()
export class ProductService {

  private _products$:Observable<Product[]>;
  private _shoppingCartState:Observable<ShoppingCartState>;
  constructor(private af: AngularFire,
              private store:Store<AppState>,
              private categoryService:CategoryService){
  }
  public createProduct(categoryKey:string, name:string, price:number, details:string, imageUrl:string,supplierKey:string):void
  {
    this.af.database.list('/products').push({
      categoryKey:categoryKey,
      name:name,
      creationDate:Date.now(),
      price:price,
      details:details,
      imageUrl:imageUrl,
      supplierKey:supplierKey
    });
  }
  public shoppingCartState$():Observable<ShoppingCartState>
  {
    if(this._shoppingCartState==null)
      this._shoppingCartState=this.store.select((state:AppState)=>state["ShoppingCartReducer"]);
    return this._shoppingCartState;
  }
  public shoppingCartProducts$():Observable<Product[]>
  {
    return this.shoppingCartState$()
      .map((shoppingCartDetails:ShoppingCartState)=>shoppingCartDetails.products.map(productFromCart=>productFromCart.productKey))
      .switchMap((products:string[])=>this.productsFromKeys$(products));
  }
  public isProductInsideShoppingCart$(productKey:string):Observable<boolean>
  {
    return this.shoppingCartState$()
      .map((shoppingCartDetails:ShoppingCartState)=>shoppingCartDetails.products.map((product:ProductFromCart)=>product.productKey))
      .map((products:string[])=>products.indexOf(productKey)>-1);
  }
  public products$():Observable<Product[]>{
    if(this._products$==null)
      this._products$=this.af.database.list('/products');
    return this._products$;
  }
  public remove(key:string):void
  {
    this.af.database.object('/products/'+key).remove();
  }
  public productsByKey$(key:string):Observable<Product>{
    return this.af.database.object('/products/'+key);
  }
  public productsFromKeys$(productsID:string[]):Observable<Product[]>{
    return this.products$()
      .map((products:Product[])=>products.filter(product1=>productsID.filter(Key=>product1.$key === Key).length>0));
  }
  public productsByCategoryKey$(categoryKey:string):Observable<Product[]> {
    return this.products$()
      .map((products: Product[])=>{
        if(categoryKey!=null)
          return products.filter((product:Product)=>product.categoryKey === categoryKey);
        else
          return products;
      });
  }
}
