/**
 * Created by armyTik on 21/09/2016.
 */
import {Injectable} from "@angular/core";
import { Action} from "@ngrx/store";

@Injectable()
export class ShoppingCartActions
{
  constructor(){}
  //
  //
  public static ADD_PRODCUCT_KEY_TO_SHOPPING_CART:string="[shopping cart] add product ID";
  public static REMOVE_PRODCUCT_KEY_FROM_SHOPPING_CART:string="[shopping cart] remove product ID";
  public static CLEAR_SHOPPING_CART:string="[shopping cart] clear shoppingCartChanged array";
  //
  //
  public addProductKeyToShoppingCart(productKey:string):Action
  {
    return {
      type: ShoppingCartActions.ADD_PRODCUCT_KEY_TO_SHOPPING_CART,
      payload: productKey
    };
  }
  public removeProductKeyFromShoppingCart(productKey:string):Action
  {
    return {
      type: ShoppingCartActions.REMOVE_PRODCUCT_KEY_FROM_SHOPPING_CART,
      payload: productKey
    };
  }
  public clearShoppingCart():Action
  {
    return {
      type: ShoppingCartActions.CLEAR_SHOPPING_CART,
    };
  }
}

