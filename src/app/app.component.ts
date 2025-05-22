import { Component, computed, effect } from '@angular/core';
import { UsersComponent } from "./users/users.component";
import { UserApiService } from './api/user-api.service';
import { User } from './model/user';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectStateService } from './state/project-state.service';
import { Project } from './model/project';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectTableComponent } from "./project-table/project-table.component";

@Component({
  selector: 'app-root',
  imports: [UsersComponent, UserDetailsComponent, ProjectsComponent, ProjectDetailsComponent, ProjectTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  usersList: User[] = [];
  selectedUser: User | null = null;
  projectsList = computed(() => this.projectStateService.getProjectsSignal());

  activeTab: 'users' | 'projects' | null = null;

  constructor(private userService: UserApiService, private projectStateService: ProjectStateService) {
    effect(() => {
      const updatedProject = this.projectStateService.updatedProject();
      if (updatedProject) {
        this.onProjectUpdated(updatedProject);
      }
      this.projectStateService.clearUpdatedProject();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.usersList = users;
    });
    this.activeTab = 'users';
  }

  getProjects() {
    this.projectStateService.loadProjects();
    this.activeTab = 'projects';
  }

  onUserSelect(user: User): void {
    this.selectedUser = { ...user };
  }

  onUserUpdated(userUpdated: User): void {
    this.selectedUser = { ...userUpdated };
    this.usersList = this.usersList.map(user =>
      user.id === userUpdated.id ? { ...userUpdated } : user
    );
  }

  onProjectSelect(project: Project): void {
    this.projectStateService.setSelectedProject(project);
    this.selectedUser = null;
  }

  onProjectUpdated(projectUpdated: Project): void {
    this.projectStateService.updateProject(projectUpdated)
  }
}
