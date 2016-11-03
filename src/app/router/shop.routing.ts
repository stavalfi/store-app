import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {IsCategoryExistGuard} from "./guards/is-category-exist.guard";
import {ShopComponent} from "../components/shop/shop/shop.component";
import {ShoppingCartComponent} from "../components/shop/shopping-cart/shopping-cart.component";

export const shopRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    children: [
      {
        path: '',
        component: ShopComponent,
        canActivate: [
          IsCategoryExistGuard
        ]
      },
      {
        path: 'cart',
        component: ShoppingCartComponent
      }
    ]
  }
]);
