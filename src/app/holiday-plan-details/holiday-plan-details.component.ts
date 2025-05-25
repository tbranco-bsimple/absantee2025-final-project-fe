import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPlan } from '../model/holiday-plan';
import { HolidayPlanStateService } from '../state/holiday-plan-state.service';

@Component({
  selector: 'app-holiday-plan-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-plan-details.component.html',
  styleUrl: './holiday-plan-details.component.css'
})
export class HolidayPlanDetailsComponent {

  holidayPlanDetails = computed(() => this.holidayPlanStateService.holidayPlanDetails());

  isEditing = false;
  localHolidayPlan: HolidayPlan | null = null;

  constructor(private holidayPlanStateService: HolidayPlanStateService) {
    effect(() => {
      const holidayPlan = this.holidayPlanDetails();
      this.isEditing = false;
      this.localHolidayPlan = holidayPlan ? structuredClone(holidayPlan) : null;
    });
  }


  edit(): void {
    this.isEditing = true;
    this.localHolidayPlan = this.holidayPlanDetails() ? structuredClone(this.holidayPlanDetails()) : null;
  }

  onEdit(): void {
    if (this.localHolidayPlan) {
      this.holidayPlanStateService.updateHolidayPlan(this.localHolidayPlan);
      this.holidayPlanStateService.setSelectedHolidayPlan(null);
      this.isEditing = false;
    }
  }
}
