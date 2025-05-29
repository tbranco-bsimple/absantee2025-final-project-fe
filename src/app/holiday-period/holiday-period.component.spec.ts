import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPeriodComponent } from './holiday-period.component';

describe('HolidayPlanComponent', () => {
  let component: HolidayPeriodComponent;
  let fixture: ComponentFixture<HolidayPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPeriodComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HolidayPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
