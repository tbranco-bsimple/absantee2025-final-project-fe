import { Component, computed, effect, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPeriod } from '../model/holiday-period';
import { CollaboratorStateService } from '../state/collaborator-state.service';

@Component({
  selector: 'app-holiday-period-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-period-details.component.html',
  styleUrl: './holiday-period-details.component.css'
})
export class HolidayPeriodDetailsComponent implements OnDestroy {

  holidayPeriodDetails = computed(() => this.collaboratorStateService.collaboratorHolidayDetails());

  isEditing = false;
  localHolidayPeriod: HolidayPeriod | null = null;

  @Input() collaboratorId!: string;

  constructor(private collaboratorStateService: CollaboratorStateService) {
    effect(() => {
      const holidayPeriod = this.holidayPeriodDetails();
      this.isEditing = false;
      this.localHolidayPeriod = holidayPeriod ? structuredClone(holidayPeriod) : null;
    });
  }

  ngOnDestroy() {
    this.collaboratorStateService.setSelectedHolidayPeriod(null);
  }

  edit(): void {
    this.isEditing = true;
    this.localHolidayPeriod = this.holidayPeriodDetails() ? structuredClone(this.holidayPeriodDetails()) : null;
  }

  onEdit(): void {
    if (this.localHolidayPeriod) {
      this.collaboratorStateService.updateHolidayPeriod(this.localHolidayPeriod);
      this.collaboratorStateService.setSelectedHolidayPeriod(null);
      this.isEditing = false;
    }
  }
  onCancel(): void {
    this.isEditing = false;
  }
}
