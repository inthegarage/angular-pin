import {Component} from '@angular/core';
import {Pin, PinInformation, Size, PinInformationType} from 'ng-pin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  fixedPinInformation: PinInformation =  {pins: []} as PinInformation;

  constructor() {
    this.fixedPinInformation.imageLocation = './assets/westgate.jpg';
    this.fixedPinInformation.imageXSize = 600;
    this.fixedPinInformation.imageYSize = 900;
    //Uncomment to stop the pins walking
    //this.fixedPinInformation.readOnly = true;
    this.fixedPinInformation.pinType = PinInformationType.MOVABLE_PINS;
    const pin = new Pin();
    pin.title = 'Westgate Towers'
    pin.text = 'Old towers';
    pin.xcoords = 300;
    pin.ycoords = 150;
    pin.size = Size.Medium;
    this.fixedPinInformation.pins.push(pin);
  }
}
