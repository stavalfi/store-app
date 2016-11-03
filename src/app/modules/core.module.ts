import {NgModule} from "@angular/core";
import {UserService} from "../services/user.service";
import {ProductService} from "../services/product.service";
import {PerchaseService} from "../services/perchase.service";
import {IsCategoryExistGuard} from "../router/guards/is-category-exist.guard";
import {IsAnyUserLoggedInGuard} from "../router/guards/is-connected.guard";
import {CategoryService} from "../services/category.service";
import {NgrxModule} from "./ngrx.module";
import {HttpModule} from "@angular/http";
import {ExchangeServiceService} from "../services/exchange-service.service";

@NgModule({
  declarations: [],
  imports: [
    NgrxModule,
    HttpModule
  ],
  providers: [
    UserService, ProductService,PerchaseService,IsCategoryExistGuard,
    CategoryService, IsAnyUserLoggedInGuard,ExchangeServiceService
  ]
})
export class CoreModule {}
