import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../models/product";
import {AppState} from "../../../redux/design/app-state";
import {Store} from "@ngrx/store";
import {ShoppingCartActions} from "../../../redux/actions/shopping-cart.actions";
import {ProductService} from "../../../services/product.service";
import {ProductFromCart} from "../../../redux/design/shopping-cart-state/product-from-cart";
import {ShoppingCartState} from "../../../redux/design/shopping-cart-state/shopping-cart.state";

@Component({
  selector: 'shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit{
  private cartProducts$:Observable<Product[]>;
  //
  constructor(private productsService:ProductService,
              private shoppingCartActions:ShoppingCartActions,
              private store:Store<AppState>) {}
  //
  ngOnInit(): void {
    this.cartProducts$=this.productsService.shoppingCartProducts$();
  }
  private productAmountFromCart$(productKey:string):Observable<number>
  {
    return this.productsService.shoppingCartState$()
      .map((shoppingCartState:ShoppingCartState)=>shoppingCartState.products.filter((productFromCart:ProductFromCart)=>productFromCart.productKey===productKey))
      .filter((productsFromCart:ProductFromCart[])=>productsFromCart.length==1)
      .map((productsFromCart:ProductFromCart[])=>productsFromCart[0].amount);
  }
  private removeProduct(productKey:string):void{
    this.store.dispatch((this.shoppingCartActions.removeProductKeyFromShoppingCart(productKey)));
  }
}
