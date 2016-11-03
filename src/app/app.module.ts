import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import {appRouting} from "./router/app.routing";
import {CoreModule} from "./modules/core.module";
import {SharedModule} from "./modules/shared.module";
import {StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {MaterialModule} from "@angular/material";
import {AccountInformationComponent} from "./components/account-information/account-information.component";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBIxyoCJ7AEzSqf4l9v4WyDsEEDOaYth1k",
  authDomain: "stavalfi-store-app.firebaseapp.com",
  databaseURL: "https://stavalfi-store-app.firebaseio.com",
  storageBucket: "stavalfi-store-app.appspot.com"
};
@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    CoreModule,
    appRouting,
    FormsModule,
    SharedModule,
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{
}
























