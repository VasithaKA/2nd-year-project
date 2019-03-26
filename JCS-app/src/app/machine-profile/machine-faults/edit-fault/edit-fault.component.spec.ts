import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaultComponent } from './edit-fault.component';

describe('EditFaultComponent', () => {
  let component: EditFaultComponent;
  let fixture: ComponentFixture<EditFaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
