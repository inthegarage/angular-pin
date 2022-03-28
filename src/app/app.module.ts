import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularPinModule} from 'ng-pin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AngularPinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
