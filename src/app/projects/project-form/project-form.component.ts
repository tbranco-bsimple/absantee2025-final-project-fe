import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectStateService } from '../project-state.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectsStateService = inject(ProjectStateService)

  projectForm: FormGroup;
  showProjectForm = false;

  constructor() {
    this.projectForm = new FormGroup({
      title: new FormControl<string>(''),
      acronym: new FormControl<string>(''),
      initDate: new FormControl<string>(this.formatDate(new Date().toDateString())),
      finalDate: new FormControl<string>(this.formatDate(new Date().toDateString()))
    });
  }

  openProjectForm() {
    this.showProjectForm = true;
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
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

    this.projectsStateService.addProject(createProject);
    this.projectForm.reset();
    this.showProjectForm = false;
  }

  cancel() {
    this.projectForm.reset();
    this.showProjectForm = false;
  }

}
