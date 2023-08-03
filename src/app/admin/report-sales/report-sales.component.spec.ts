import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesComponent } from './report-sales.component';

describe('ReportSalesComponent', () => {
  let component: ReportSalesComponent;
  let fixture: ComponentFixture<ReportSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportSalesComponent]
    });
    fixture = TestBed.createComponent(ReportSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
