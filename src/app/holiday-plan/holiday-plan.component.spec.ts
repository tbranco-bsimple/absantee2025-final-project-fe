import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPlanComponent } from './holiday-plan.component';

describe('HolidayPlanComponent', () => {
  let component: HolidayPlanComponent;
  let fixture: ComponentFixture<HolidayPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
