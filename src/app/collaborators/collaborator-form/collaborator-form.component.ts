import { Component, effect, inject, signal } from '@angular/core';
import { CollaboratorForm } from '../collaborator-form';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PeriodDateTimeForm } from '../../model/period-date-time-form';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CollaboratorApiService } from '../collaborator-api.service';
import { Collaborator } from '../collaborator';
import { CollaboratorFormService } from './collaborator-form.service';

@Component({
  selector: 'app-collaborator-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './collaborator-form.component.html',
  styleUrl: './collaborator-form.component.css'
})
export class CollaboratorFormComponent {

  serviceApi = inject(CollaboratorApiService);
  serviceForm = inject(CollaboratorFormService);
  form: FormGroup;

  constructor() {
    this.form = new FormGroup<CollaboratorForm>({
      names: new FormControl<string>(''),
      surnames: new FormControl<string>(''),
      email: new FormControl<string>(''),
      deactivationDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
      periodDateTime: new FormGroup<PeriodDateTimeForm>({
        _initDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
        _finalDate: new FormControl<string>(this.formatDate(new Date().toDateString()))
      })
    });

    effect(() => {
      const collaborator = this.serviceForm.isEditingCollaboratorForm();
      if (collaborator) {
        const patch = {
          ...collaborator,
          deactivationDate: this.formatDate(collaborator.userPeriod._finalDate),
          periodDateTime: {
            _initDate: this.formatDate(collaborator.collaboratorPeriod._initDate),
            _finalDate: this.formatDate(collaborator.collaboratorPeriod._finalDate),
          }
        };
        this.form.patchValue(patch);
        this.form.patchValue(collaborator);
      }
    });
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  submitCollaborator() {
    console.log("antes de enviar: ", this.form.value);
    if (this.form.valid) {
      console.log("Form is valid, submitting...");
      const rawValue = this.form.value;

      const collaborator = {
        ...this.serviceForm.isEditingCollaboratorForm(),
        ...rawValue,
        deactivationDate: new Date(rawValue.deactivationDate),
        periodDateTime: {
          _initDate: new Date(rawValue.periodDateTime._initDate),
          _finalDate: new Date(rawValue.periodDateTime._finalDate)
        }
      };

      if (this.serviceForm.isCreatingCollaboratorForm()) {

        console.log("Creating collaborator: ", collaborator);

        this.serviceApi.addCollaborator(collaborator).subscribe({
          next: (createdCollaborator) => {
            console.log("Created collaborator: ", createdCollaborator);
            this.serviceForm.setCollaboratorCreated(createdCollaborator);
            this.serviceForm.cancelCreatingCollaboratorForm();
          }
        })
      } else if (this.serviceForm.isEditingCollaboratorForm()) {

        this.serviceApi.updateCollaborator(collaborator).subscribe({
          next: (updatedCollaborator) => {
            console.log("Updated Project: ", updatedCollaborator);
            this.serviceForm.setCollaboratorEdited(updatedCollaborator);
            this.serviceForm.cancelEditingCollaboratorForm();
          }
        })
      }
      this.form.reset();
    }
  }

  onCancel() {
    this.form.reset();
    this.serviceForm.cancelCreatingCollaboratorForm();
    this.serviceForm.cancelEditingCollaboratorForm();
  }
}
