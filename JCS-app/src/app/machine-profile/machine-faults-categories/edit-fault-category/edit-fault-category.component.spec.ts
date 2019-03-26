import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaultCategoryComponent } from './edit-fault-category.component';

describe('EditFaultCategoryComponent', () => {
  let component: EditFaultCategoryComponent;
  let fixture: ComponentFixture<EditFaultCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFaultCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFaultCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
