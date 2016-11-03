import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {FilterArrayPipe} from "../pipes/filter-array.pipe";
import {WeatherPipe} from "../pipes/weather-info.pipe";
import {MaterialModule} from "@angular/material";

@NgModule({
  declarations: [
    FilterArrayPipe,WeatherPipe
  ],
  imports: [
    MaterialModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  exports: [
    FilterArrayPipe,WeatherPipe
  ]
})
export class SharedModule {
}
