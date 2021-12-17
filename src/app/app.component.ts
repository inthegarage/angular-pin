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
    this.fixedPinInformation.pinType = PinInformationType.EXPAND_PINS;
    let pin = new Pin();
    pin.title = 'Westgate Towers'
    pin.text = 'Old towers';
    pin.xcoords = 300;
    pin.ycoords = 150;
    pin.size = Size.Medium;
    this.fixedPinInformation.pins.push(pin);
    pin = new Pin();
    pin.xcoords = 204;
    pin.ycoords = 84;
    pin.size = Size.Medium;
    pin.title = "Flag"
    pin.text = "Union Jack";
    this.fixedPinInformation.pins.push(pin);
    pin = new Pin();
    pin.xcoords = 380;
    pin.ycoords = 616;
    pin.size = Size.Medium;
    pin.title = "Cyclist";
    pin.text = "Cyclist returning to work, there's not many cycle lanes here.";
    this.fixedPinInformation.pins.push(pin);
  }

  printInformation(pinInformation: PinInformation) {
    console.log(`Current Information ${JSON.stringify(pinInformation)}`);
  }
}
