import {Component, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'create-product',
  templateUrl: 'create-product.component.html',
  styleUrls: ['create-product.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent implements OnInit {

  @Output() onCreateProduct = new EventEmitter();
  @Output() onCencel = new EventEmitter();
  private error:string=null;
  private showCreateProductComponent:boolean=false;
  constructor() { }
  public createProduct(name:string,details:string, imageUrl:string, price:string):void {
    if (name == "")
      this.error = "Name can't be empty";
    else if (details == "")
      this.error = "Details can't be empty";
    else if (imageUrl == "")
      this.error = "Details can't be empty";
    else if (price == "")
      this.error = "Details can't be empty";
    else
      this.onCreateProduct.emit({name: name, details: details, imageUrl: imageUrl, price: price});
  }
  public cencel():void
      {
        this.onCencel.emit();
  }
    ngOnInit() {
    }

  }
