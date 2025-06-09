import { Component, inject } from '@angular/core';
import { CollaboratorForm } from '../collaborator-form';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PeriodDateTimeForm } from '../../model/period-date-time-form';
import { CollaboratorStateService } from '../collaborator-state.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collaborator-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './collaborator-form.component.html',
  styleUrl: './collaborator-form.component.css'
})
export class CollaboratorFormComponent {

  collaboratorStateService = inject(CollaboratorStateService);

  collaboratorForm: FormGroup;
  showCollaboratorForm = false;

  constructor() {
    this.collaboratorForm = new FormGroup<CollaboratorForm>({
      names: new FormControl<string>(''),
      surnames: new FormControl<string>(''),
      email: new FormControl<string>(''),
      deactivationDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
      periodDateTime: new FormGroup<PeriodDateTimeForm>({
        _initDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
        _finalDate: new FormControl<string>(this.formatDate(new Date().toDateString()))
      })
    });
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  openCollaboratorForm() {
    this.showCollaboratorForm = true;
  }

  submitCollaborator() {
    const { names, surnames, email, deactivationDate, periodDateTime } = this.collaboratorForm.value;

    if (!names || !surnames || !email || !periodDateTime?._initDate || !periodDateTime?._finalDate) return;

    console.log('Submitting collaborator:', { names, surnames, email, deactivationDate, periodDateTime });

    const createCollaborator = {
      names,
      surnames,
      email,
      deactivationDate,
      periodDateTime: {
        _initDate: this.formatDate(periodDateTime._initDate),
        _finalDate: this.formatDate(periodDateTime._finalDate)
      }
    };

    this.collaboratorStateService.addCollaborator(createCollaborator);
    this.collaboratorForm.reset();
    this.showCollaboratorForm = false;
  }

  onCancel() {
    this.collaboratorForm.reset();
    this.showCollaboratorForm = false;
  }
}
