import { Component, computed, effect, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPeriod } from '../holiday-period';
import { CollaboratorStateService } from '../../collaborators/collaborator-state.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-holiday-period-details',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './holiday-period-details.component.html',
  styleUrl: './holiday-period-details.component.css'
})
export class HolidayPeriodDetailsComponent implements OnDestroy {

  holidayPeriod: HolidayPeriod | null = null;
  localHolidayPeriod: HolidayPeriod | null = null;
  collaboratorId: string = '';
  isEditing = false;

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;


  constructor(private collaboratorStateService: CollaboratorStateService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['holidayPeriod'];
      if (resolved) {
        this.holidayPeriod = resolved;
        this.isEditing = false;
        this.localHolidayPeriod = structuredClone(resolved);
      }
    });

    this.collaboratorId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  edit(): void {
    this.isEditing = true;
    this.localHolidayPeriod = this.holidayPeriod ? structuredClone(this.holidayPeriod) : null;
  }

  onEdit(): void {
    if (this.localHolidayPeriod) {
      this.collaboratorStateService.updateHolidayPeriod(this.collaboratorId, this.localHolidayPeriod);
      this.isEditing = false;
    }
  }

  onCancel(): void {
    this.isEditing = false;
  }

  hasChanges(): boolean {
    const original = this.holidayPeriod;
    const edited = this.localHolidayPeriod;

    if (!original || !edited) return false;

    return original.periodDate.initDate !== edited.periodDate.initDate ||
      original.periodDate.finalDate !== edited.periodDate.finalDate;
  }
}
