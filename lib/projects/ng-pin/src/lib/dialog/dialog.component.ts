import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "./dialog.service";

@Component({
  selector: 'jw-modal',
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnInit, OnDestroy {

  @Input()
  id: string;

  @Input()
  captionText : string = '';
  pinId : string = null;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.save();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(id : string, captionText : string = ''): void {
    this.captionText = captionText;
    this.pinId = id;
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  save(): void {
    this.removeDialog();
    this.modalService.fireUpdate({id : this.pinId, text : this.captionText});
  }

  remove() :void {
    this.removeDialog()
    this.modalService.fireUpdate({id : this.pinId, text : null});
  }

  private removeDialog() : void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }


}
