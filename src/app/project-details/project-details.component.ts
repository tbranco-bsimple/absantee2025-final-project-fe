import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../model/project';
import { ProjectStateService } from '../state/project-state.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

  projectDetails = computed(() => this.projectStateService.projectDetails());

  isEditing = false;
  localProject: Project | null = null;

  constructor(private projectStateService: ProjectStateService) {
    effect(() => {
      const project = this.projectDetails();
      this.isEditing = false;
      this.localProject = project ? JSON.parse(JSON.stringify(project)) : null;
    });
  }


  edit(): void {
    this.isEditing = true;
    this.localProject = this.projectDetails() ? { ...this.projectDetails()! } : null;
  }

  onEdit(): void {
    if (this.localProject) {
      console.log('Editing project:', this.localProject);
      this.projectStateService.emitProjectUpdated(this.localProject);
      this.isEditing = false;
    }
  }
}