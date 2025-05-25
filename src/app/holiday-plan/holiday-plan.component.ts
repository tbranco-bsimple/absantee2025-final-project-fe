import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { HolidayPlanStateService } from '../state/holiday-plan-state.service';
import { HolidayPlan } from '../model/holiday-plan';

@Component({
  selector: 'app-holiday-plan',
  imports: [CommonModule],
  templateUrl: './holiday-plan.component.html',
  styleUrl: './holiday-plan.component.css'
})
export class HolidayPlanComponent {

  holidayPlans = computed(() => this.holidayPlanStateService.holidayPlans());

  constructor(private holidayPlanStateService: HolidayPlanStateService) { }

  handleHolidayPlanSelected(holidayPlan: HolidayPlan) {
    this.holidayPlanStateService.setSelectedHolidayPlan(holidayPlan);
  }
}
