import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPeriodComponent } from './training-period.component';

describe('TrainingPeriodComponent', () => {
  let component: TrainingPeriodComponent;
  let fixture: ComponentFixture<TrainingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
