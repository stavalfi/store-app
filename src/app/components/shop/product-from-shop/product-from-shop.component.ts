import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'product-from-shop',
  templateUrl: 'product-from-shop.component.html',
  styleUrls: ['product-from-shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFromShopComponent{
  @Input() product:Product;
  @Input() isInsideShoppingCart:boolean;
  @Input() amITheProductSupplier:boolean;
  @Output() onAddToCart=new EventEmitter<string>();
  @Output() onRemoveProductFromShop=new EventEmitter<string>();
  constructor(){}
  private removeProductFromShop()
  {
    this.onRemoveProductFromShop.emit(this.product.$key);
  }
  private addToCart()
  {
    this.onAddToCart.emit(this.product.$key);
  }
}
