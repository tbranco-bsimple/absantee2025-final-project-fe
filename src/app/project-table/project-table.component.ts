import { Component, computed } from '@angular/core';
import { Project } from '../model/project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../state/project-state.service';
import { AssociationProjCollabComponent } from '../association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from '../association-proj-collab-details/association-proj-collab-details.component';

@Component({
  selector: 'app-project-table',
  imports: [CommonModule, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css'
})
export class ProjectTableComponent {

  projects = computed(() => this.projectStateService.projects());
  selectedProjectId: string | null = null;

  constructor(private projectStateService: ProjectStateService) { }

  handleProjectSelected(project: Project) {
    this.projectStateService.setSelectedProject(project);
  }

  openAssociations(projectId: string) {
    this.selectedProjectId = projectId;
    this.projectStateService.setSelectedProject(null);
  }
}
