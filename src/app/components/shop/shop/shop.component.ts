import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../redux/design/app-state";
import {ShoppingCartActions} from "../../../redux/actions/shopping-cart.actions";
import {UserService} from "../../../services/user.service";
import {AuthState} from "../../../redux/design/auth-state/auth.state";
import {AuthGeneralStatus} from "../../../redux/design/auth-state/auth-general-status";
import {CategoryService} from "../../../services/category.service";
import {User} from "../../../models/user";
import {Product} from "../../../models/product";

@Component({
  selector: 'shop',
  templateUrl: 'shop.component.html',
  styleUrls: ['shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit,OnDestroy{
  private products$:Observable<any[]>;
  private disableCreateProductButton$:Observable<boolean>;
  private showCreateProductComponent:boolean=false;
  constructor(private productsService:ProductService,
              private route:ActivatedRoute,
              private shoppingCartActions:ShoppingCartActions,
              private store:Store<AppState>,
              private userService:UserService,
              private router:Router){
  }
  ngOnInit(): void
  {
    this.products$=this.route.params
      .map(params=>params['categoryKey'])
      .switchMap((categoryID:string)=>this.productsService.productsByCategoryKey$(categoryID));
    this.disableCreateProductButton$=this.userService.isAnyUserLoggedIn$()
      .map((isAnyUserLoggedIn:boolean)=>!isAnyUserLoggedIn);
  }
  private removeProductFromShop(productKey:string)
  {
    this.productsService.remove(productKey);
  }
  private amITheProductSupplier(productKey:string):Observable<boolean>
  {
    return this.productsService.productsByKey$(productKey)
      .switchMap((product:Product)=>
        this.userService.loggedInUser$()
          .map((user:User)=>user==null?false:product.supplierKey==user.$key));
  }
  private isProductInsideShoppingCart$(productKey:string):Observable<boolean>
  {
    return this.productsService.isProductInsideShoppingCart$(productKey);
  }
  private categoryChanged(categoryKey:string):void
  {
    if(categoryKey==null)
      this.router.navigate(['shop']);
    else
      this.router.navigate(['shop',{
        categoryKey:categoryKey
      }]);
  }
  private addToCart(productKey:string):void
  {
    this.store.dispatch(this.shoppingCartActions.addProductKeyToShoppingCart(productKey));
  }
  public ngOnDestroy(): void {

  }
  private onCreateProduct(productDetails:any):void
  {
    this.userService
      .loggedInUser$().take(1)
      .toPromise()
      .then((userLoggedIn:User)=>
        this.productsService.createProduct(
          "-KUQC05t2jYu64eu5ecU",
          productDetails.name,
          productDetails.price,
          productDetails.details,
          productDetails.imageUrl,
          userLoggedIn.$key
        ));
    this.showCreateProductComponent=false;
  }
}
