import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPlanDetailsComponent } from './holiday-plan-details.component';

describe('HolidayPlanDetailsComponent', () => {
  let component: HolidayPlanDetailsComponent;
  let fixture: ComponentFixture<HolidayPlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPlanDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
