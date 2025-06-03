import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CollaboratorDetailsComponent } from './holidays/collaborator-details/collaborator-details.component';
import { CollaboratorsComponent } from './holidays/collaborators/collaborators.component';
import { By } from '@angular/platform-browser';
import { ProjectsComponent } from './holidays/projects-bullets/projects-bullets.component';
import { ProjectTableComponent } from './holidays/projects/projects.component';
import { ProjectDetailsComponent } from './holidays/project-details/project-details.component';
import { ProjectApiService } from './projects/project-api.service';
import { ProjectStateService } from './projects/project-state.service';
import { signal, WritableSignal } from '@angular/core';
import { Project } from './projects/project';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;
  let projectSignal: WritableSignal<Project[]>;
  let projectDetailsSignal: WritableSignal<Project | null>;

  beforeEach(async () => {
    projectSignal = signal<Project[]>([]);
    projectDetailsSignal = signal<Project | null>(null);

    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', [
      'loadProjects',
      'updateProject',
      'setSelectedProject',
      'clearUpdatedProject',
      'updatedProject',
      'getProjectsSignal',
      'getProjectDetailsSignal'
    ], {
      projects: projectSignal,
      projectDetails: projectDetailsSignal,
      getProjectsSignal: () => projectSignal(),
      getProjectDetailsSignal: () => projectDetailsSignal()
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent, CollaboratorsComponent, CollaboratorDetailsComponent, ProjectsComponent, ProjectTableComponent, ProjectDetailsComponent],
      providers: [
        provideHttpClient(),
        { provide: ProjectStateService, useValue: mockProjectStateService },
        ProjectApiService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should create the app', () => {
    expect(app).toBeTruthy();
  });



  it('should render Users and Project buttons by default', () => {
    const usersButton = fixture.nativeElement.querySelector('button.primary-button:nth-child(1)');
    const projectsButton = fixture.nativeElement.querySelector('button.primary-button:nth-child(2)');

    expect(usersButton).not.toBeNull();
    expect(usersButton.textContent.trim()).toBe('Users');

    expect(projectsButton).not.toBeNull();
    expect(projectsButton.textContent.trim()).toBe('Project');
  });



  it('should not render any components by default', () => {
    const selectors = [
      'app-users',
      'app-user-details',
      'app-projects',
      'app-projects-table',
      'app-project-details'
    ];

    selectors.forEach(selector => {
      const exists = fixture.nativeElement.querySelector(selector);
      expect(exists).toBeNull();
    });
  });



  it('should call getUsers() and show app-users when clicking Users button', () => {
    spyOn(app, 'getUsers');
    app.activeTab = 'users';
    fixture.detectChanges();

    const usersButton = fixture.nativeElement.querySelector('button.primary-button:nth-child(1)');
    usersButton.click();
    fixture.detectChanges();

    expect(app.getUsers).toHaveBeenCalled();

    const usersComponent = fixture.nativeElement.querySelector('app-users');
    expect(usersComponent).toBeTruthy();
  });



  it('should call getProjects() and show app-projects + app-project-tables when clicking Projects button', () => {
    spyOn(app, 'getProjects');
    app.activeTab = 'projects';
    fixture.detectChanges();

    const projectsButton = fixture.nativeElement.querySelector('button.primary-button:nth-child(2)');
    projectsButton.click();
    fixture.detectChanges();

    expect(app.getProjects).toHaveBeenCalled();

    const projectsComponent = fixture.nativeElement.querySelector('app-projects');
    expect(projectsComponent).toBeTruthy();
    const projectsTableComponent = fixture.nativeElement.querySelector('app-project-table');
    expect(projectsTableComponent).toBeTruthy();
  });



  it('should display user details when a user is selected', () => {
    //Arrange
    const mockUsers = [
      {
        id: 1, names: 'Alice', surnames: 'Smith', email: 'alice@email.com', periodDateTime: {
          _initDate: new Date('2024-01-01'),
          _finalDate: new Date('2024-12-31')
        }
      },
      {
        id: 2, names: 'Bob', surnames: 'Brown', email: 'bob@email.com', periodDateTime: {
          _initDate: new Date('2024-01-01'),
          _finalDate: new Date('2024-12-31')
        }
      },
      {
        id: 3, names: 'Charlie', surnames: 'Doe', email: 'charlie@email.com', periodDateTime: {
          _initDate: new Date('2024-01-01'),
          _finalDate: new Date('2024-12-31')
        }
      }
    ];

    app.collaboratorsList = mockUsers;
    app.activeTab = 'users';
    fixture.detectChanges();


    const usersComponent = fixture.debugElement.query(By.directive(CollaboratorsComponent))?.componentInstance;
    expect(usersComponent).toBeTruthy();  // Verifica se o componente está instanciado corretamente


    //Act
    usersComponent.selectedUserEvent.emit(mockUsers[1]);
    fixture.detectChanges();

    //Assert
    expect(app.selectedUser).toEqual(mockUsers[1]);

    const detailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent))?.componentInstance;
    expect(detailsComponent.userDetails).toEqual(mockUsers[1]);


    const userDetailsElement = fixture.nativeElement.querySelector('app-user-details');
    expect(userDetailsElement).not.toBeNull();
  });



  it('should display project details when a project is selected', () => {
    const mockProjects: Project[] = [
      {
        id: 1, title: 'Project A', acronym: 'PA',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      },
      {
        id: 2, title: 'Project B', acronym: 'PB',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    const selectedProject = mockProjects[1];

    // Simula o separador ativo
    app.activeTab = 'projects';
    fixture.detectChanges();

    projectSignal.set(mockProjects);
    fixture.detectChanges();

    const projectListElement = fixture.nativeElement.querySelectorAll('app-projects ul li');

    //Act
    projectListElement[1].click();
    projectDetailsSignal.set(mockProjects[1]);
    fixture.detectChanges();

    // Assert
    const detailsComponent = fixture.debugElement.query(By.directive(ProjectDetailsComponent))?.componentInstance;
    expect(detailsComponent).toBeTruthy();
    expect(detailsComponent.projectDetails()).toEqual(selectedProject);

    const projectDetailsElement = fixture.nativeElement.querySelector('app-project-details');
    expect(projectDetailsElement).not.toBeNull();
  });



  it('should display project details when a project-table is selected', () => {
    const mockProjects: Project[] = [
      {
        id: 1, title: 'Project A', acronym: 'PA',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      },
      {
        id: 2, title: 'Project B', acronym: 'PB',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    const selectedProject = mockProjects[1];

    // Simula o separador ativo
    app.activeTab = 'projects';
    fixture.detectChanges();

    projectSignal.set(mockProjects);
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('app-project-table table tr');

    //Act
    tableRows[1].click();
    projectDetailsSignal.set(mockProjects[1]);
    fixture.detectChanges();

    // Assert
    const detailsComponent = fixture.debugElement.query(By.directive(ProjectDetailsComponent))?.componentInstance;
    expect(detailsComponent).toBeTruthy();
    expect(detailsComponent.projectDetails()).toEqual(selectedProject);

    const projectDetailsElement = fixture.nativeElement.querySelector('app-project-details');
    expect(projectDetailsElement).not.toBeNull();
  });


  it('should update project when project is edited in details component', () => {
    const mockProject = {
      id: 2, title: 'Updated Project', acronym: 'UP',
      periodDate: {
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31')
      }
    };

    app.activeTab = 'projects';
    projectDetailsSignal.set(mockProject);
    fixture.detectChanges();

    const detailsComponent = fixture.debugElement.query(By.directive(ProjectDetailsComponent))?.componentInstance;
    expect(detailsComponent).toBeTruthy();

    spyOn(app, 'onProjectUpdated');
    detailsComponent.userUpdated.emit(mockProject); // ou projectUpdated
    fixture.detectChanges();

    expect(app.onProjectUpdated).toHaveBeenCalledWith(mockProject);
  });

});
