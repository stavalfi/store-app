import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {IsAnyUserLoggedInGuard} from "./guards/is-connected.guard";
import {AccountInformationComponent} from "../components/account-information/account-information.component";
import {ProfileComponent} from "../components/account-information/profile/profile.component";

export const accountRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: AccountInformationComponent,

    canActivate: [
      IsAnyUserLoggedInGuard
    ]
  }
]);
