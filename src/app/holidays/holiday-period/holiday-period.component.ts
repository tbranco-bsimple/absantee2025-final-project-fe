import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HolidayPeriod } from '../holiday-period';
import { CollaboratorStateService } from '../../collaborators/collaborator-state.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-holiday-period',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './holiday-period.component.html',
  styleUrl: './holiday-period.component.css'
})
export class HolidayPeriodComponent implements OnInit, OnDestroy {

  holidayPeriods: HolidayPeriod[] | null = null;
  collaboratorId: string = '';

  showButtons = false;

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  constructor(private collaboratorStateService: CollaboratorStateService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.holidayPeriods = data['holidays'];
    });

    this.collaboratorId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleHolidayPeriodSelected(holidayPeriod: HolidayPeriod) {
    this.collaboratorStateService.setSelectedHolidayPeriod(holidayPeriod);
    this.holidaysForm.clear();
    this.showButtons = false;
  }

  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>>([])
  });

  get holidaysForm(): FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>> {
    return this.form.get('holidays') as FormArray;
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  createEmptyHoliday() {
    this.showButtons = true;
    this.holidaysForm.push(
      new FormGroup({
        initDate: new FormControl(this.formatDate(new Date().toDateString())),
        finalDate: new FormControl(this.formatDate(new Date().toDateString()))
      }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>
    );
  }

  submitNewHolidayPeriod() {

    const lastGroup = this.holidaysForm.at(this.holidaysForm.length - 1);

    const initDate = lastGroup.get('initDate')?.value;
    const finalDate = lastGroup.get('finalDate')?.value;

    console.log('Submitting new holiday period:', initDate, finalDate);
    if (!initDate || !finalDate) return;

    this.collaboratorStateService.addHolidayPeriod(this.collaboratorId, initDate, finalDate);
    this.holidaysForm.clear();
    this.showButtons = false;
  }

  onCancel() {
    this.holidaysForm.clear();
    this.showButtons = false;
  }
}
