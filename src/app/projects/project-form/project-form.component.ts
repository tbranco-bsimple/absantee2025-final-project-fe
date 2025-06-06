import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectStateService } from '../project-state.service';
import { ProjectForm } from '../project-form';
import { PeriodDateForm } from '../../model/period-date-form';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectStateService = inject(ProjectStateService)

  projectForm: FormGroup;
  showProjectForm = false;

  constructor() {
    this.projectForm = new FormGroup<ProjectForm>({
      title: new FormControl<string>(''),
      acronym: new FormControl<string>(''),
      periodDate: new FormGroup<PeriodDateForm>({
        initDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
        finalDate: new FormControl<string>(this.formatDate(new Date().toDateString()))
      })
    });
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  openProjectForm() {
    this.showProjectForm = true;
  }

  submitProject() {
    const { title, acronym, initDate, finalDate } = this.projectForm.value;

    if (!title || !acronym || !initDate || !finalDate) return;

    console.log('Submitting project:', { title, acronym, initDate, finalDate });

    const createProject = {
      title,
      acronym,
      periodDate: {
        initDate: initDate,
        finalDate: finalDate
      }
    };

    this.projectStateService.addProject(createProject);
    this.projectForm.reset();
    this.showProjectForm = false;
  }

  onCancel() {
    this.projectForm.reset();
    this.showProjectForm = false;
  }

}
