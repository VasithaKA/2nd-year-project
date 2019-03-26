import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomComponent;
  let fixture: ComponentFixture<HomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
