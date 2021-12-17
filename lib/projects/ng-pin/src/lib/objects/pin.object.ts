export class Pin {
  text : string = '';
  title: string = '';
  xcoords : number = 0;
  ycoords : number = 0;
  id : string = null;
  direction : Direction = 0;
  size : Size = 0;
}
export class PinUpdate {
  id : string = null;
  text: string = '';
}

export enum Direction {
  Up,
  Down,
  Left,
  Right
}
export enum Size {
  Small,
  Medium,
  Large
}
