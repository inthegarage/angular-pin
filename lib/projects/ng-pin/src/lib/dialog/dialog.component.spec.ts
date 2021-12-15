import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {FormsModule} from "@angular/forms";
import {ModalService} from "./dialog.service";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const spy: { fireUpdate: jasmine.Spy, add: jasmine.Spy, remove: jasmine.Spy } =
    jasmine.createSpyObj('ModalService', ['fireUpdate', 'add', 'remove']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent ],
      imports: [FormsModule],
      providers:[{provide: ModalService, useValue: spy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog', fakeAsync(() => {
    component.open('my-dialog', 'current test');
    fixture.detectChanges();
    expect(component.pinId).toEqual('my-dialog');
    tick(1);
    expect(fixture.nativeElement.querySelector('#text-entry').value).toBe('current test');
    expect(document.body.classList).toContain('jw-modal-open');
  }));

  it('should close the dialog with save', fakeAsync(() => {
    spy.fireUpdate.calls.reset();
    component.open('my-dialog', 'current test');
    fixture.detectChanges();
    tick(1);
    fixture.nativeElement.querySelector('#text-entry').value = 'new value';
    component.save();
    fixture.detectChanges()
    tick(1);
    expect(document.body.classList).not.toContain('jw-modal-open');
    expect(spy.fireUpdate.calls.count()).toBe(1, 'one call');

  }));

  it('should close the dialog with remove', fakeAsync(() => {
    spy.fireUpdate.calls.reset();
    component.open('my-dialog', 'current test');
    fixture.detectChanges();
    tick(1);
    fixture.nativeElement.querySelector('#text-entry').value = 'new value';
    component.remove();
    fixture.detectChanges()
    tick(1);
    expect(document.body.classList).not.toContain('jw-modal-open');
    expect(spy.fireUpdate.calls.count()).toBe(1, 'one call');
  }));

});
