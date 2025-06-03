import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPeriodDetailsComponent } from './holiday-period-details.component';

describe('HolidayPlanDetailsComponent', () => {
  let component: HolidayPeriodDetailsComponent;
  let fixture: ComponentFixture<HolidayPeriodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPeriodDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HolidayPeriodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
