import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRolesComponent } from './set-roles.component';

describe('SetRolesComponent', () => {
  let component: SetRolesComponent;
  let fixture: ComponentFixture<SetRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
