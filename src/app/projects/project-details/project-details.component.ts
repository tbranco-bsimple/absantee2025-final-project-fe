import { Component, computed, effect, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../project';
import { ProjectStateService } from '../project-state.service';
import { ActivatedRoute } from '@angular/router';

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

  private route = inject(ActivatedRoute);
  projectId = this.route.snapshot.paramMap.get('id');

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
  onCancel() {
    this.isEditing = false;
  }

  onClose() {
    this.projectStateService.setSelectedProject(null);
  }
}