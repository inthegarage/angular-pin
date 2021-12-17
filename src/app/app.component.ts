import {Component} from '@angular/core';
import {Pin, PinInformation, Size, PinInformationType} from 'ng-pin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pinInformation: PinInformation =  {pins: []} as PinInformation;

  constructor() {
    this.pinInformation.imageLocation = './assets/westgate.jpg';
    this.pinInformation.imageXSize = 600;
    this.pinInformation.imageYSize = 900;
    this.pinInformation.readOnly = true;
    this.pinInformation.pinType = PinInformationType.EXPAND_PINS;
    const pin = new Pin();
    pin.text = 'Westgate Towers';
    pin.xcoords = 20;
    pin.ycoords = 100;
    pin.size = Size.Medium;
    this.pinInformation.pins.push(pin);
  }
}
