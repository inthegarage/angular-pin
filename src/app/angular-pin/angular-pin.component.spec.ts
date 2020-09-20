import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AngularPin} from './angular-pin.directive';

describe('AngularPinComponent', () => {
  let component: AngularPin;
  let fixture: ComponentFixture<AngularPin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
