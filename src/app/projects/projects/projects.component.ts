import { Component, computed } from '@angular/core';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../project-state.service';
import { AssociationProjCollabComponent } from '../../associations/association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from '../../associations/association-proj-collab-details/association-proj-collab-details.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

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
