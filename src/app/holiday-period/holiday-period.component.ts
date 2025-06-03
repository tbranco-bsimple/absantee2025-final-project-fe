import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnChanges } from '@angular/core';
import { HolidayPeriod } from '../model/holiday-period';
import { CollaboratorStateService } from '../state/collaborator-state.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-holiday-period',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './holiday-period.component.html',
  styleUrl: './holiday-period.component.css'
})
export class HolidayPeriodComponent implements OnChanges {

  holidayPeriods = computed(() => this.collaboratorStateService.collaboratorHolidays());

  @Input() collaboratorId!: string;
  showButtons = false;

  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>>([])
  });

  constructor(private collaboratorStateService: CollaboratorStateService) {
  }

  ngOnChanges() {
    if (this.collaboratorId) {
      this.collaboratorStateService.loadCollaboratorHolidays(this.collaboratorId);
      console.log('holiday peeriods on changes', this.collaboratorId);
    }
  }

  handleHolidayPeriodSelected(holidayPeriod: HolidayPeriod) {
    this.collaboratorStateService.setSelectedHolidayPeriod(holidayPeriod);
    this.holidaysForm.clear();
    this.showButtons = false;
  }

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
