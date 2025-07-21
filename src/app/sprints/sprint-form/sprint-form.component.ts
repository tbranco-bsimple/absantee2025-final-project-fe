import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SprintForm } from '../models/sprint-form.model';
import { SprintApiService } from '../sprint-api.service';
import { SprintFormService } from './sprint-form.service';
import { CreateSprint } from '../models/create-sprint';
import { ProjectApiService } from '../../projects/project-api.service';
import { Project } from '../../projects/project';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent {

  private apiService = inject(SprintApiService);
  private formService = inject(SprintFormService);
  projectApi = inject(ProjectApiService);
  projects: Project[] = [];

  form: FormGroup<SprintForm>;

  constructor() {
    this.projectApi.getAllProjectsFromJson().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error loading projects', err)
    });

    this.form = new FormGroup<SprintForm>({
      projectId: new FormControl<string | null>(null),
      initDate: new FormControl<string | null>(null),
      finalDate: new FormControl<string | null>(null),
      totalEffortHours: new FormControl<number | null>(null),
    });

    effect(() => {
      if (this.formService.isCreatingSprintForm()) {
        this.form.reset();
      }
    });
  }

  submitSprint() {
    if (this.form.valid) {
      const rawValue = this.form.value;

      const newSprint: CreateSprint = {
        projectId: rawValue.projectId!,
        period: {
          initDate: rawValue.initDate!,
          finalDate: rawValue.finalDate!
        },
        totalEffortHours: rawValue.totalEffortHours!
      };

      this.apiService.createSprint(newSprint).subscribe({
        next: (created) => {
          console.log('Sprint created:', created);
          this.formService.setSprintCreated(created);
          this.formService.cancelCreatingSprintForm();
          this.form.reset();
        },
        error: (err) => console.error('Error creating sprint:', err)
      });
    }
  }

  onCancel() {
    this.form.reset();
    this.formService.cancelCreatingSprintForm();
  }
}
