import { Component, computed, effect } from '@angular/core';
import { UsersComponent } from "./users/users.component";
import { User } from './model/user';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectStateService } from './state/project-state.service';
import { Project } from './model/project';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectTableComponent } from "./project-table/project-table.component";
import { HolidayPlanComponent } from './holiday-plan/holiday-plan.component';
import { HolidayPlanStateService } from './state/holiday-plan-state.service';
import { HolidayPlan } from './model/holiday-plan';
import { HolidayPlanDetailsComponent } from "./holiday-plan-details/holiday-plan-details.component";
import { UserService } from './service/user.service';
import { AssociationProjCollabComponent } from './association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from './association-proj-collab-details/association-proj-collab-details.component';
import { AssociationProjCollabStateService } from './state/association-proj-collab-state.service';
import { HeaderComponent } from './header/header.component';
import { AssociationProjCollab } from './model/association-proj-collab';


@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    UsersComponent, UserDetailsComponent,
    ProjectsComponent, ProjectDetailsComponent, ProjectTableComponent,
    HolidayPlanComponent, HolidayPlanDetailsComponent,
    AssociationProjCollabComponent, AssociationProjCollabDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  usersList: User[] = [];
  selectedUser: User | null = null;
  projectsList = computed(() => this.projectStateService.projects());
  holidayPlansList = computed(() => this.holidayPlanStateService.holidayPlans());
  associationsList = computed(() => this.associationProjCollabStateService.associations());

  activeTab: 'users' | 'projects' | 'holiday-plans' | 'assocations-proj-collab' | null = null;

  constructor(
    private userService: UserService,
    private projectStateService: ProjectStateService,
    private holidayPlanStateService: HolidayPlanStateService,
    private associationProjCollabStateService: AssociationProjCollabStateService
  ) { }

  onTabSelected(tab: typeof this.activeTab): void {
    this.activeTab = tab;
    if (tab !== 'users') {
      this.selectedUser = null;
    }

    switch (tab) {
      case 'users':
        this.getUsers();
        break;
      case 'projects':
        this.getProjects();
        break;
      case 'holiday-plans':
        this.getHolidayPlans();
        break;
      case 'assocations-proj-collab':
        this.getAssociations();
        break;
    }
  }

  getUsers() {
    this.usersList = this.userService.getUsers();
    this.activeTab = 'users';
  }

  getProjects() {
    this.projectStateService.loadProjects();
    this.activeTab = 'projects';
  }

  getHolidayPlans() {
    this.holidayPlanStateService.loadHolidayPlans();
    this.activeTab = 'holiday-plans';
  }

  getAssociations() {
    this.associationProjCollabStateService.loadAssociations();
    this.activeTab = 'assocations-proj-collab';
  }


  //USER
  onUserSelect(user: User): void {
    this.selectedUser = { ...user };
  }

  onUserUpdated(userUpdated: User): void {
    this.selectedUser = { ...userUpdated };
    this.usersList = this.usersList.map(user =>
      user.id === userUpdated.id ? { ...userUpdated } : user
    );
  }

}
