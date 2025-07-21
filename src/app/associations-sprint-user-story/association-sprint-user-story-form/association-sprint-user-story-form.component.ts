import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AssociationSprintUserStoryApiService } from '../association-sprint-user-story-api.service';
import { AssociationSprintUserStoryFormService } from './association-sprint-user-story-form.service';
import { CreateAssociationSprintUserStory } from '../models/create-association-sprint-user-story';
import { UpdateAssociationSprintUserStory } from '../models/update-association-sprint-user-story';


@Component({
  selector: 'app-association-sprint-user-story-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './association-sprint-user-story-form.component.html',
  styleUrl: './association-sprint-user-story-form.component.css'
})
export class AssociationSprintUserStoryFormComponent {

  serviceApi = inject(AssociationSprintUserStoryApiService);
  serviceForm = inject(AssociationSprintUserStoryFormService);

  form: FormGroup = new FormGroup({
    sprintId: new FormControl<string>(''),
    userStoryId: new FormControl<string>(''),
    collaboratorId: new FormControl<string>(''),
    effortHours: new FormControl<number>(0),
    completionPercentage: new FormControl<number>(0),
  });

  constructor() {
    effect(() => {
      const editing = this.serviceForm.isEditingAssociationForm();
      if (editing) {
        this.form.patchValue({
          effortHours: editing.effortHours,
          completionPercentage: editing.completionPercentage
        });

        this.form.get('sprintId')?.disable();
        this.form.get('userStoryId')?.disable();
        this.form.get('collaboratorId')?.disable();
        this.form.patchValue({
          sprintId: editing.sprintId,
          userStoryId: editing.userStoryId,
          collaboratorId: editing.collaboratorId
        });
      }
    });
  }

  submit() {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();

      if (this.serviceForm.isCreatingAssociationForm()) {
        const createDto: CreateAssociationSprintUserStory = {
          sprintId: rawValue.sprintId,
          userStoryId: rawValue.userStoryId,
          collaboratorId: rawValue.collaboratorId,
          effortHours: rawValue.effortHours,
          completionPercentage: rawValue.completionPercentage
        };

        this.serviceApi.createAssociation(createDto).subscribe({
          next: created => {
            this.serviceForm.setAssociationCreated(created);
            this.serviceForm.cancelCreatingAssociationForm();
            this.form.reset();
          }
        });

      } else if (this.serviceForm.isEditingAssociationForm()) {
        const updateDto: UpdateAssociationSprintUserStory = {
          effortHours: rawValue.effortHours,
          completionPercentage: rawValue.completionPercentage
        };

        const id = this.serviceForm.isEditingAssociationForm()!.id;

        this.serviceApi.updateAssociation(id, updateDto).subscribe({
          next: updated => {
            this.serviceForm.setAssociationEdited(updated);
            this.serviceForm.cancelEditingAssociationForm();
            this.form.reset();
          }
        });
      }
    }
  }

  onCancel() {
    this.form.reset();
    this.serviceForm.cancelCreatingAssociationForm();
    this.serviceForm.cancelEditingAssociationForm();
  }
}
