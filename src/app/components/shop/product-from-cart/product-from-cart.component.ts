import {Component, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Product} from "../../../models/product";
import {Output, Input} from "@angular/core/src/metadata/directives";
import {ProductFromCart} from "../../../redux/design/shopping-cart-state/product-from-cart";

@Component({
  selector: 'product-from-cart',
  templateUrl: './product-from-cart.component.html',
  styleUrls: ['./product-from-cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFromCartComponent implements OnInit {

  @Input() productAmountFromCart:number;
  @Input() product:Product;
  @Output() onRemoveFromCart=new EventEmitter<string>();
  constructor(){


  }
  ngOnInit(): void {
  }
  private removeFromCart()
  {
    this.onRemoveFromCart.emit(this.product.$key);
  }

}
