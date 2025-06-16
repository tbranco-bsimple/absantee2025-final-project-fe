import { Component, effect, inject } from '@angular/core';
import { CollaboratorApiService } from '../../collaborators/collaborator-api.service';
import { HolidayPeriodFormService } from './holiday-period-form.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HolidayPeriodForm } from '../holiday-period-form';
import { PeriodDateForm } from '../../model/period-date-form';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-holiday-period-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './holiday-period-form.component.html',
  styleUrl: './holiday-period-form.component.css'
})
export class HolidayPeriodFormComponent {

  serviceApi = inject(CollaboratorApiService);
  serviceForm = inject(HolidayPeriodFormService);
  form: FormGroup;

  collabId: string = '';

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.collabId = id;
      }
    }
    )
    this.form = new FormGroup<HolidayPeriodForm>({
      initDate: new FormControl<string>(new Date().toDateString()),
      finalDate: new FormControl<string>(new Date().toDateString())
    });

    effect(() => {
      const holidayPeriod = this.serviceForm.isEditingHolidayPeriodForm();
      if (holidayPeriod) {
        this.form.patchValue(holidayPeriod);
      } else {
        this.form.reset();
      }
    });
  }

  submitHolidayPeriod() {
    console.log("antes de enviar: ", this.form.value);
    if (this.form.valid) {
      console.log("Form is valid, submitting...");
      const holidayPeriod = this.form.value;

      if (this.serviceForm.isCreatingHolidayPeriodForm()) {

        console.log("Creating holiday period: ", holidayPeriod);

        this.serviceApi.addCollaboratorHoliday(this.collabId, holidayPeriod).subscribe({
          next: (createdHolidayPeriod) => {
            console.log("Created holiday period: ", createdHolidayPeriod);
            this.serviceForm.setHolidayPeriodCreated(createdHolidayPeriod);
            this.serviceForm.cancelCreatingHolidayPeriodForm();
          }
        })
      } else if (this.serviceForm.isEditingHolidayPeriodForm()) {

        this.serviceApi.updateCollaboratorHoliday(this.collabId, holidayPeriod).subscribe({
          next: (updatedHolidayPeriod) => {
            console.log("Updated Project: ", updatedHolidayPeriod);
            this.serviceForm.setHolidayPeriodEdited(updatedHolidayPeriod);
            this.serviceForm.cancelEditingHolidayPeriodForm();
          }
        })
      }
      this.form.reset();
    }
  }

  onCancel() {
    this.form.reset();
    this.serviceForm.cancelCreatingHolidayPeriodForm();
    this.serviceForm.cancelEditingHolidayPeriodForm();
  }

}
