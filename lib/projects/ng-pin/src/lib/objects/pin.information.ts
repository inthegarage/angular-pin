import {Pin} from "./pin.object";

export class PinInformation {
  public imageLocation : string = '';
  public imageXSize : number = 0;
  public imageYSize : number = 0;
  public readOnly : boolean = false;
  public pinType: PinInformationType = PinInformationType.MOVABLE_PINS;
  public pins : Array<Pin> = [];
}

export enum PinInformationType {
  EXPAND_PINS,
  MOVABLE_PINS
}
