import { Component, computed, effect, OnDestroy } from '@angular/core';
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
export class ProjectDetailsComponent implements OnDestroy {

  projectDetails = computed(() => this.projectStateService.projectDetails());

  isEditing = false;
  localProject: Project | null = null;

  constructor(private projectStateService: ProjectStateService) {
    effect(() => {
      const project = this.projectDetails();
      this.isEditing = false;
      this.localProject = project ? structuredClone(project) : null;
    });
  }

  ngOnDestroy(): void {
    this.projectStateService.setSelectedProject(null);
  }

  edit() {
    this.isEditing = true;
    this.localProject = this.projectDetails() ? structuredClone(this.projectDetails()) : null;
  }

  onEdit() {
    if (this.localProject) {
      this.projectStateService.updateProject(this.localProject);
      this.projectStateService.setSelectedProject(null);
      this.isEditing = false;
    }
  }
}