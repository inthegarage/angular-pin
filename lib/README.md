# ng-pin

This is the library project for ng-pin.

To use simply include the package in your package.json
```html
<section angular-pin [(pinInformation)]="pinInformation">

</section>
```
pinInformation can be defined as follows:

```typescript
pinInformation : PinInformation = <PinInformation>{pins  : []};
```

and then fill it in.

```typescript
    this.pinInformation.imageLocation = './assets/westgate.jpg';
    this.pinInformation.imageXSize = 600;
    this.pinInformation.imageYSize = 900;
    let pin = new Pin();
    pin.text = 'Westgate Towers';
    pin.xcoords = 20;
    pin.ycoords = 100;
    pin.size = Size.Medium;
    this.pinInformation.pins.push(pin);
```

The initial pin array can be empty.
