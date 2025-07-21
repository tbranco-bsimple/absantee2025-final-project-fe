import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserStoriesComponent } from './user-stories.component';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { UserStoryFormService } from '../user-story-form/user-story-form.service';
import { UserStoryViewModel } from '../models/user-story-view.model';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import { UserStoryDetailsComponent } from '../user-story-details/user-story-details.component';
import { UserStoryFormComponent } from '../user-story-form/user-story-form.component';
import { routes } from '../../app.routes';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserStoryResolver } from '../user-story.resolver';
import { of } from 'rxjs';


describe('UserStoriesComponent', () => {
  let component: UserStoriesComponent;
  let fixture: ComponentFixture<UserStoriesComponent>;

  const mockUserStories: UserStoryViewModel[] = [
    { id: '1', description: 'Story 1', priorityLabel: 'High', riskLabel: 'Medium' },
    { id: '2', description: 'Story 2', priorityLabel: 'Low', riskLabel: 'Low' },
  ];

  const mockCreatedUserStory: UserStoryViewModel = {
    id: '3', description: 'New Story', priorityLabel: 'Critical', riskLabel: 'High'
  };

  const userStoryCreatedSignal = signal<UserStoryViewModel | undefined>(undefined);

  const formServiceMock = {
    userStoryCreated: userStoryCreatedSignal.asReadonly(),
    startCreatingUserStoryForm: jasmine.createSpy('startCreatingUserStoryForm'),
  };

  beforeEach(async () => {
    userStoryCreatedSignal.set(undefined);

    await TestBed.configureTestingModule({
      imports: [CommonModule, UserStoriesComponent, SearchBarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { userStories: mockUserStories } } } },
        { provide: UserStoryFormService, useValue: formServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userStories from route data', () => {
    expect(component.userStories()).toEqual(mockUserStories);
  });

  it('should call formService to start creating user story', () => {
    component.addUserStory();
    expect(formServiceMock.startCreatingUserStoryForm).toHaveBeenCalled();
  });

  it('should add created user story when formService emits it', () => {
    userStoryCreatedSignal.set(mockCreatedUserStory);

    fixture.detectChanges();

    expect(component.userStories().length).toBe(3);
    expect(component.userStories()).toContain(mockCreatedUserStory);
  });

  it('should have routerLinks on each user story row', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockUserStories.length);

    expect(rows[0].attributes['ng-reflect-router-link']).toBe('1');
    expect(rows[1].attributes['ng-reflect-router-link']).toBe('2');
  });

  it('should have routerLink "add" on Add User Story button', () => {
    const addButton = fixture.debugElement.query(By.css('button.add-user-story-button'));
    expect(addButton.attributes['ng-reflect-router-link']).toBe('add');
  });
});

describe('UserStoriesComponentIntegration', () => {
  let router: Router;
  let location: Location;
  let fixture: any;

  const mockUserStories: UserStoryViewModel[] = [
    { id: '1', description: 'Story 1', priorityLabel: 'High', riskLabel: 'Medium' },
    { id: '2', description: 'Story 2', priorityLabel: 'Low', riskLabel: 'Low' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        AppComponent,
        UserStoriesComponent,
        UserStoryDetailsComponent,
        UserStoryFormComponent,
      ],
      providers: [
        {
          provide: UserStoryResolver,
          useValue: {
            resolve: () => of(mockUserStories)
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should navigate to user story detail on row click', fakeAsync(() => {
    fixture.detectChanges();
    router.navigate(['/userstories']);
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const row = compiled.querySelector('tbody tr');
    row.click();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/userstories/1');
  }));

  /*  it('should navigate to add user story on button click', fakeAsync(() => {
     fixture.detectChanges();
     router.navigate(['/userstories']);
     tick();
     fixture.detectChanges();
 
     const compiled = fixture.nativeElement;
     const addButton = compiled.querySelector('.add-user-story-button');
     addButton.click();
     tick();
     fixture.detectChanges();
 
     expect(location.path()).toBe('/userstories/add');
   })); */
});
