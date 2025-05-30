import { Component, computed } from '@angular/core';
import { CollaboratorsComponent } from "./collaborators/collaborators.component";
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectStateService } from './state/project-state.service';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectTableComponent } from "./project-table/project-table.component";
import { HeaderComponent } from './header/header.component';
import { CollaboratorStateService } from './state/collaborator-state.service';


@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CollaboratorsComponent, CollaboratorDetailsComponent,
    /* ProjectsComponent, */ ProjectDetailsComponent, ProjectTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  collaboratorsList = computed(() => this.collaboratorStateService.collaborators());
  projectsList = computed(() => this.projectStateService.projects());

  activeTab: 'collaborators' | 'projects' | null = null;

  constructor(
    private collaboratorStateService: CollaboratorStateService,
    private projectStateService: ProjectStateService,
  ) { }

  onTabSelected(tab: typeof this.activeTab): void {
    this.activeTab = tab;

    switch (tab) {
      case 'collaborators':
        this.getCollaborators();
        break;
      case 'projects':
        this.getProjects();
        break;
    }
  }

  getCollaborators() {
    this.collaboratorStateService.loadCollaborators();
    this.activeTab = 'collaborators';
  }

  getProjects() {
    this.projectStateService.loadProjects();
    this.activeTab = 'projects';
  }

}
