import { Component, computed } from '@angular/core';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../project-state.service';
import { AssociationProjCollabComponent } from '../../associations/association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from '../../associations/association-proj-collab-details/association-proj-collab-details.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { SprintsComponent } from "../../sprints/sprints/sprints.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule, ProjectFormComponent, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent, SearchBarComponent, SprintsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects = computed(() => this.projectStateService.projects());
  projectDetails = computed(() => this.projectStateService.projectDetails());
  showSprints: boolean = false;
  showAssociations: boolean = false;
  selectedProjectId: string | null = null;

  constructor(private projectStateService: ProjectStateService) {
    this.projectStateService.loadProjectsFromJson();
  }

  handleProjectSelected(project: Project) {
    this.projectStateService.setSelectedProject(project);
  }

  openAssociations(projectId: string) {
    this.showAssociations = true;
    this.selectedProjectId = projectId;
    this.projectStateService.setSelectedProject(null);
  }

  openSprints(projectId: string) {
    this.showSprints = true;
    this.selectedProjectId = projectId;
    this.projectStateService.setSelectedProject(null);
  }


}
