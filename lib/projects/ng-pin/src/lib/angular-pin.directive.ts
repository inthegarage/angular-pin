import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {Direction, Pin, PinInformation, PinInformationType, PinUpdate, Size} from "./objects";
import {DOCUMENT} from "@angular/common";
import {ModalService} from "./dialog/dialog.service";
import {DialogComponent} from "./dialog/dialog.component";
import {Subject} from "rxjs";

@Directive({
  selector: '[angular-pin]',
})
export class AngularPin implements OnInit {

  @Input()
  pinInformation: PinInformation = <PinInformation>{};
  @Output()
  pinInformationChange: EventEmitter<PinInformation> = new EventEmitter<PinInformation>();

  private pins: Map<string, any> = new Map<string, any>()
  private hasSelected: boolean = false;
  private clickReceived: boolean = false;
  private currentId: string = null;
  private updateSubject = new Subject<PinUpdate>();

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              private modalService: ModalService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderImage();
    this.renderPins();
  }

  private renderImage() {
    this.renderer.setAttribute(this.el.nativeElement, 'style',
      'position: relative;background-image: url(\'' + this.pinInformation.imageLocation + '\');' +
      'background-size: ' + this.pinInformation.imageXSize + 'px ' + this.pinInformation.imageYSize + 'px;' +
      'width: ' + this.pinInformation.imageXSize + 'px;height : ' + this.pinInformation.imageYSize + 'px;');
  }

  private renderPins() {
    if (this.pinInformation.pins.length > 0) {
      let vm = this;
      this.pinInformation.pins.forEach((nextPin: Pin) => {
        if (vm.pinInformation.pinType === PinInformationType.MOVABLE_PINS) {
          vm.addAPin(vm, nextPin);
        } else {
          vm.addExpandablePin(vm, nextPin);
        }

      })
      this.addDialogProcessor();
    }
  }

  private addExpandablePin(vm: AngularPin, nextPin: Pin) {
    let spanArea = this.renderer.createElement("span");
    nextPin.id = vm.uuidv4();
    let spanPlus = vm.renderer.createElement('span');
    vm.renderer.addClass(spanPlus,  'static-plus');
    vm.renderer.setProperty(spanPlus, 'innerHTML', '+');
    vm.renderer.appendChild(spanArea, spanPlus);

    if (nextPin.text) {
      let spanCaption = vm.renderer.createElement("span");
      let spanBorder = vm.renderer.createElement('span');
      let spanContent = vm.renderer.createElement('span');
      let spanTitle = vm.renderer.createElement('span');
      vm.renderer.addClass(spanBorder, 'static-border');
      vm.renderer.addClass(spanCaption, 'static-box');
      vm.renderer.addClass(spanCaption, 'hidden')
      vm.renderer.addClass(spanTitle, 'static-title');
      vm.renderer.setProperty(spanTitle, 'innerHTML', nextPin.title);
      vm.renderer.addClass(spanContent, 'static-content');
      vm.renderer.setProperty(spanContent, 'innerHTML', nextPin.text);
      vm.renderer.appendChild(spanCaption, spanBorder);
      vm.renderer.appendChild(spanCaption, spanTitle);
      vm.renderer.appendChild(spanCaption, spanContent);
      vm.renderer.appendChild(spanArea, spanCaption);
      vm.renderer.appendChild(vm.el.nativeElement, spanArea);
      setTimeout(() => {
        vm.computeCaptionPlacement(vm, spanArea, spanCaption);
      }, 10)

    }
    vm.renderer.setAttribute(spanArea, 'id', nextPin.id);
    vm.renderer.addClass(spanArea, 'pin-marker');
    vm.renderer.setAttribute(spanArea, 'style', this.stylePin(nextPin));

    vm.pins.set(nextPin.id, spanArea);
    return nextPin.id;
  }

  private computeCaptionPlacement(vm: AngularPin, spanArea : HTMLElement, spanCaption: HTMLElement) {

    const spanAreaLeft = spanArea.offsetLeft;
    const spanAreaTop = spanArea.offsetTop;

    const imageAreaHeight = vm.el.nativeElement.offsetHeight;
    const imageAreaWidth = vm.el.nativeElement.offsetWidth;

    const heightRatio = imageAreaHeight/spanAreaTop;
    const widthRatio = imageAreaWidth/spanAreaLeft;

    if (heightRatio < 2) {
      // caption is over (H) 1/2 way so position is upwards.
      vm.renderer.setStyle(spanCaption, 'top', '-170px');
    } else {
      vm.renderer.setStyle(spanCaption, 'top', '32px');
    }

    if (widthRatio < 2) {
      // caption is over (W) 1/2 way so position is leftwards
      vm.renderer.setStyle(spanCaption, 'left', '-300px');
    } else {
      vm.renderer.setStyle(spanCaption, 'left', '32px');
    }

  }

  private addAPin(vm: AngularPin, nextPin: Pin): string {
    let spanArea = this.renderer.createElement("span");

    if (nextPin.text) {
      let spanCaption = this.renderer.createElement("span");
      vm.renderer.addClass(spanCaption, 'popover-box');
      vm.renderer.setProperty(spanCaption, 'innerHTML', nextPin.text);
      vm.renderer.appendChild(spanArea, spanCaption);
    }

    nextPin.id = vm.uuidv4();
    vm.renderer.setAttribute(spanArea, 'id', nextPin.id);
    vm.renderer.addClass(spanArea, 'pin');
    vm.renderer.setAttribute(spanArea, 'style', this.stylePin(nextPin));
    vm.renderer.appendChild(vm.el.nativeElement, spanArea);
    vm.pins.set(nextPin.id, spanArea);
    return nextPin.id;
  }

  private addDialogProcessor() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const component: any = this.viewContainerRef.createComponent(componentFactory);
    component.instance.id = 'text-modal'
    this.renderer.setAttribute(component.location.nativeElement, 'id', 'text-modal')
    this.modalService.addListener(this.updateSubject);
    let vm = this;
    vm.updateSubject.asObservable().subscribe(pinUpdate => {
      let pin: Pin = vm.pinInformation.pins.find(item => item.id === pinUpdate.id);
      let index = vm.pinInformation.pins.indexOf(pin);
      let element = vm.document.getElementById(pinUpdate.id);
      if (pinUpdate.text === null) {
        //delete this.pinInformation.pins[pin]
        element.parentElement.removeChild(element);
        vm.pinInformation.pins.splice(index, 1);
        vm.pins.delete(pinUpdate.id)
      } else {
        pin.text = pinUpdate.text;
        let popOverBox = element.getElementsByClassName('popover-box')[0];
        vm.renderer.setProperty(popOverBox, 'innerHTML', pinUpdate.text);
        vm.pins.set(pinUpdate.id, element);
      }

      //clear down flags.
      vm.hasSelected = false;
      vm.clickReceived = false;
      vm.currentId = null;
      vm.pinInformationChange.emit(vm.pinInformation);
    })

  }

  private stylePin(nextPin: Pin): string {
    let style: string;
    if (!this.pinInformation.readOnly && this.pinInformation.pinType !== PinInformationType.EXPAND_PINS) {
      style = 'background-image: url(\'./assets/marker.png\'); ' +
        'cursor:grab;position:absolute;top:' + nextPin.ycoords + 'px;left:' + nextPin.xcoords + 'px;';
    } else {
      if (this.pinInformation.pinType !== PinInformationType.MOVABLE_PINS) {
        style = 'cursor:pointer;position:absolute;top:' + nextPin.ycoords + 'px;left:' + nextPin.xcoords + 'px;';
      } else {
        style = 'background-image: url(\'./assets/marker.png\'); position: absolute; top:' + nextPin.ycoords + 'px;left:' + nextPin.xcoords + 'px;';
      }
    }
    switch (nextPin.size) {
      case Size.Large:
        style += 'width: 64px;height: 64px;background-size: 64px 64px;';
        break;
      case Size.Medium:
        style += 'width: 32px;height: 32px;background-size: 32px 32px;';
        break;
      case Size.Small:
        style += 'width: 16px;height: 16px;background-size: 16px 16px;';
        break;
    }
    return style;
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.pinInformation.pinType === PinInformationType.MOVABLE_PINS) {
      if (!this.pinInformation.readOnly) {
        this.processEditingClick(event);
      }
    } else {
      let targetElement : HTMLElement = event.target;
      this.processStaticItem(targetElement);
    }
  }

  private processStaticItem(targetElement : HTMLElement) {
    let parentElement : HTMLElement = null;
    this.removeCurrentStaticBlock();
    if (targetElement.classList.contains('static-plus')) {
      parentElement = targetElement.parentElement;
    } else if (targetElement.classList.contains('pin-marker')) {
      parentElement = targetElement;
    }
    if (parentElement != null) {
      this.currentId = parentElement.id;
      this.renderer.removeClass(parentElement.childNodes[1], 'hidden');
    }
  }

  private removeCurrentStaticBlock() {
    if (this.currentId) {
      const currentEle = this.document.getElementById(this.currentId);
      this.renderer.addClass(currentEle.childNodes[1], 'hidden');
      this.currentId = null;
    }
  }

  private processEditingClick(event) {
    let targetElement = event.target;
    if (event.target.classList.contains('popover-box')) {
      targetElement = targetElement.parentNode;
    }
    let id: string = targetElement.id;
    if (this.pins.has(id) && !this.hasSelected) {
      this.clickReceived = true;
      let pin: Pin = this.pinInformation.pins.find(item => item.id === id);
      this.modalService.open('text-modal', pin.id, pin.text);
    } else if (!this.pins.has(id) && !this.hasSelected) {
      // clicking somewhere new, therefore add a pin.
      let pin: Pin = <Pin>{};
      pin.xcoords = event.offsetX;
      pin.ycoords = event.offsetY;
      pin.direction = Direction.Down;
      pin.size = Size.Medium;
      pin.text = 'New Pin';
      this.pinInformation.pins.push(pin)
      this.addAPin(this, pin);
      this.modalService.open('text-modal', pin.id, pin.text);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (!this.pinInformation.readOnly && this.pinInformation.pinType === PinInformationType.MOVABLE_PINS) {
      this.currentId = event.target.id;
      if (this.pins.has(this.currentId)) {
        let vm = this;
        setTimeout(function () {
          vm.hasSelected = true;
        }, 0)
      }
    }

  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    // always cancel the selection.
    if (!this.pinInformation.readOnly && this.pinInformation.pinType === PinInformationType.MOVABLE_PINS) {
      let vm = this;
      setTimeout(function () {
        vm.hasSelected = false;
        vm.currentId = null;
        vm.clickReceived = true;
        vm.pinInformationChange.emit(vm.pinInformation);
      }, 10);
    }
  }


  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.hasSelected && this.currentId) {
      // Move
      let thisPin: any = this.pins.get(this.currentId);
      let pinInformation: Pin = this.pinInformation.pins.find(item => item.id === this.currentId);
      if (thisPin && pinInformation) {
        pinInformation.xcoords = pinInformation.xcoords + event.movementX;
        pinInformation.ycoords = pinInformation.ycoords + event.movementY;
        if (pinInformation.xcoords < -1) {
          pinInformation.xcoords = 0;
        }
        if (this.pinInformation.imageXSize < pinInformation.xcoords) {
          pinInformation.xcoords = this.pinInformation.imageXSize;
        }
        if (pinInformation.ycoords < -1) {
          pinInformation.ycoords = 0;
        }
        if (this.pinInformation.imageYSize < pinInformation.ycoords) {
          pinInformation.ycoords = this.pinInformation.imageYSize;
        }
        this.renderer.setAttribute(thisPin, 'style', this.stylePin(pinInformation));
      }
    }
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}
