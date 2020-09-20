import {Component} from '@angular/core';
import {PinInformation} from "./objects/pin.information";
import {Pin, Size} from "./objects/pin.object";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pinInformation : PinInformation = <PinInformation>{pins  : []};

  constructor() {
    this.pinInformation.imageLocation = './assets/westgate.jpg';
    this.pinInformation.imageXSize = 600;
    this.pinInformation.imageYSize = 900;
    let pin = new Pin();
    pin.text = 'Westgate Towers';
    pin.xcoords = 20;
    pin.ycoords = 100;
    pin.size = Size.Medium;
    this.pinInformation.pins.push(pin);
  }
}
