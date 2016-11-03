import { NgModule } from '@angular/core';
import {ProfileComponent} from "../components/account-information/profile/profile.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {accountRouting} from "../router/account.routing";
import {SharedModule} from "./shared.module";
import {MaterialModule} from "@angular/material";
import {AccountInformationComponent} from "../components/account-information/account-information.component";

@NgModule({
  declarations: [
    ProfileComponent,AccountInformationComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    SharedModule,
    accountRouting,
    CommonModule,
    FormsModule
  ]
})
export class AccountModule {
}
