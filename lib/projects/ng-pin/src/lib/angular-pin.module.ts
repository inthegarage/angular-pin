import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularPin} from "./angular-pin.directive";
import {DialogModule} from "./dialog/dialog.module";

@NgModule({
  declarations: [AngularPin],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports : [
    AngularPin
  ]

})
export class AngularPinModule { }
