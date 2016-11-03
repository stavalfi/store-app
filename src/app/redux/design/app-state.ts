import {ShoppingCartState} from "./shopping-cart-state/shopping-cart.state";
import {ExceptionDetails} from "./general-failures-state/exception-details";
import {ServicesStatusState} from "./services-status-state/services-status.state";
import {AuthState} from "./auth-state/auth.state";

export class AppState
{
  public constructor(
    public authState?:AuthState,
    public generalFailuresState?:ExceptionDetails[],
    public shoppingCartDetailsState?:ShoppingCartState,
    public serversStatusDetailsState?:ServicesStatusState){}

}
