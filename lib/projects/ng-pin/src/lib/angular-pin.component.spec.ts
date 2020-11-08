import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularPinModule, PinInformation} from "ng-pin";
import {Component} from "@angular/core";

@Component({
  template: `
    <div angular-pin [pinInformation]="pinInformation">

    </div>`
})
class TestComponent {

  pinInformation : PinInformation = {pins: [] } as PinInformation;
}

describe('AngularPinDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [AngularPinModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
