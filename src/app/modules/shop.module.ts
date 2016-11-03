import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShoppingCartComponent} from "../components/shop/shopping-cart/shopping-cart.component";
import {ShopComponent} from "../components/shop/shop/shop.component";
import {ProductFromShopComponent} from "../components/shop/product-from-shop/product-from-shop.component";
import {CategoriesComponent} from "../components/shop/categories/categories.component";
import {NgModule} from "@angular/core";
import {shopRouting} from "../router/shop.routing";
import {SharedModule} from "./shared.module";
import {MaterialModule} from "@angular/material";
import {CreateProductComponent} from "../components/shop/create-product/create-product.component";
import {ProductFromCartComponent} from "../components/shop/product-from-cart/product-from-cart.component";

@NgModule({
  declarations: [
    ShoppingCartComponent,ShopComponent,ProductFromShopComponent,CategoriesComponent,CreateProductComponent,
    ProductFromCartComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    SharedModule,
    shopRouting,
    CommonModule,
    FormsModule
  ]
})
export class ShopModule {
}
