import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HolidayPeriod } from '../holiday-period';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { HolidayPeriodFormService } from '../holiday-period-form/holiday-period-form.service';

@Component({
  selector: 'app-holiday-period',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './holiday-period.component.html',
  styleUrl: './holiday-period.component.css'
})
export class HolidayPeriodComponent implements OnDestroy {

  holidayPeriods = signal<HolidayPeriod[]>([]);
  collaboratorId: string = '';

  showButtons = false;

  formService = inject(HolidayPeriodFormService);

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  constructor() {
    this.subscription = this.route.data.subscribe(data => {
      this.holidayPeriods.set(data['holidays']);
    });

    this.collaboratorId = this.route.snapshot.paramMap.get('id')!;

    effect(() => {

      const holidayPeriodCreated = this.formService.holidayPeriodCreated();
      const holidayPeriodEdited = this.formService.holidayPeriodEdited();

      if (holidayPeriodCreated) {
        this.holidayPeriods.update(holidayPeriods => [...holidayPeriods, holidayPeriodCreated]);
      }
      if (holidayPeriodEdited) {
        this.holidayPeriods.update(holidayPeriods =>
          holidayPeriods.map(hp => hp.id === holidayPeriodEdited.id ? holidayPeriodEdited : hp)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addHolidayPeriod() {
    this.formService.startCreatingHolidayPeriodForm();
  }
}
