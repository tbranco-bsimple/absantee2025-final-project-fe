import { Component, computed } from '@angular/core';
import { CollaboratorsComponent } from './collaborators/collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ProjectStateService } from './projects/project-state.service';
import { HeaderComponent } from './header/header.component';
import { CollaboratorStateService } from './collaborators/collaborator-state.service';


@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CollaboratorsComponent, CollaboratorDetailsComponent,
    /* ProjectsBulletsComponent, */ ProjectDetailsComponent, ProjectsComponent,
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
