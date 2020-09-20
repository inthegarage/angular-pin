import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularPin } from './angular-pin/angular-pin.directive';
import { DialogComponent } from './angular-pin/dialog/dialog.component';
import {DialogModule} from "./angular-pin/dialog/dialog.module";

@NgModule({
  declarations: [
    AppComponent,
    AngularPin
  ],
  imports: [
    BrowserModule, DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
