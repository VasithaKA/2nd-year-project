import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDetailReportComponent } from './tech-detail-report.component';

describe('TechDetailReportComponent', () => {
  let component: TechDetailReportComponent;
  let fixture: ComponentFixture<TechDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
