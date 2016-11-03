import {Action} from "@ngrx/store";
import {ShoppingCartState} from "../design/shopping-cart-state/shopping-cart.state";
import {ShoppingCartActions} from "../actions/shopping-cart.actions";
import {ProductFromCart} from "../design/shopping-cart-state/product-from-cart";

let initialState: ShoppingCartState=new ShoppingCartState([]);

export const ShoppingCartReducer = (lastState = initialState, action:Action):ShoppingCartState => {
  switch (action.type) {
    case ShoppingCartActions.ADD_PRODCUCT_KEY_TO_SHOPPING_CART:
      let oldProduct:ProductFromCart[]=lastState.products.filter(product=>product.productKey === action.payload);
      let newProduct:ProductFromCart=null;
      if (oldProduct.length === 0) {
        newProduct = new ProductFromCart(action.payload, 1, Date.now());
        return new ShoppingCartState(lastState.products.concat(newProduct));
      }
      else {
        newProduct = new ProductFromCart(action.payload, oldProduct[0].amount + 1, Date.now());
        return new ShoppingCartState(lastState.products
          .filter(product=>product.productKey !== action.payload)
          .concat(newProduct));
      }
    case ShoppingCartActions.REMOVE_PRODCUCT_KEY_FROM_SHOPPING_CART: {
      let oldProduct:ProductFromCart[]=lastState.products.filter(product=>product.productKey === action.payload);
      if(oldProduct.length==1) {
        if (oldProduct[0].amount > 1)
          return new ShoppingCartState(
            lastState.products.filter(product=>product.productKey !== action.payload)
              .concat(new ProductFromCart(action.payload, oldProduct[0].amount - 1, Date.now())));
        else
          return new ShoppingCartState(lastState.products.filter(product=>product.productKey !== action.payload));
      }
      break;
    }
    case ShoppingCartActions.CLEAR_SHOPPING_CART:
      return new ShoppingCartState([]);
    default:
      return lastState;
  }
};
