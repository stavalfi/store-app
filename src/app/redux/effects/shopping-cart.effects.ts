import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import {ProductService} from "../../services/product.service";
import {AppState} from "../design/app-state";
import {Store} from "@ngrx/store";

@Injectable()
export class ShoppingCartEffects
{
  constructor(private actions$: Actions,
              private productService:ProductService,
              private store:Store<AppState>){}
  //

}
