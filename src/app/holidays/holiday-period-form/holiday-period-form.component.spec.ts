import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPeriodFormComponent } from './holiday-period-form.component';

describe('HolidayPeriodFormComponent', () => {
  let component: HolidayPeriodFormComponent;
  let fixture: ComponentFixture<HolidayPeriodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPeriodFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPeriodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
