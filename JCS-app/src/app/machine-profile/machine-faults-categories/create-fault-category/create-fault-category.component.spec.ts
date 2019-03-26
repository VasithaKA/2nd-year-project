import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaultCategoryComponent } from './create-fault-category.component';

describe('CreateFaultCategoryComponent', () => {
  let component: CreateFaultCategoryComponent;
  let fixture: ComponentFixture<CreateFaultCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFaultCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFaultCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
