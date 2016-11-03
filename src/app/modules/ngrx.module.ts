import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {generalFailureReducer} from "../redux/reducers/general-failures.reducer";
import {authReducer} from "../redux/reducers/auth.reducer";
import {ShoppingCartReducer} from "../redux/reducers/shopping-cart.reducer";
import {AuthEffects} from "../redux/effects/auth.effects";
import {GeneralFailuresEffects} from "../redux/effects/general-failures.effects";
import {ShoppingCartEffects} from "../redux/effects/shopping-cart.effects";
import {GeneralFailuresActions} from "../redux/actions/general-failures.actions";
import {AuthActions} from "../redux/actions/auth.actions";
import {ShoppingCartActions} from "../redux/actions/shopping-cart.actions";
import {EffectsModule} from "@ngrx/effects";
import {ServicesStatusEffects} from "../redux/effects/servers-status.effects";
import {ExchangeServiceEffects} from "../redux/effects/exchange-service.effects";
import {serversStatusReducer} from "../redux/reducers/services-status.reducer";
import {ServicesStatusActions} from "../redux/actions/services-status.actions";
import {ExchangeServiceActions} from "../redux/actions/exchage-service.actions";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.provideStore({
      generalFailureReducer,
      authState: authReducer,
      ShoppingCartReducer,
      serversStatusState:serversStatusReducer
    }),
    EffectsModule.runAfterBootstrap(AuthEffects),
    EffectsModule.runAfterBootstrap(GeneralFailuresEffects),
    EffectsModule.runAfterBootstrap(ShoppingCartEffects),
    EffectsModule.runAfterBootstrap(ServicesStatusEffects),
    EffectsModule.runAfterBootstrap(ExchangeServiceEffects)
  ],
  providers: [
    GeneralFailuresActions,
    AuthActions,
    ShoppingCartActions,
    ExchangeServiceActions,
    ServicesStatusActions
  ]
})
export class NgrxModule {}
