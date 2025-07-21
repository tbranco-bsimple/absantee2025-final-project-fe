import { Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators/collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorFormComponent } from './collaborators/collaborator-form/collaborator-form.component';
import { CollaboratorDetailsResolver } from './collaborators/collaborator-details.resolver';
import { HolidayPeriodComponent } from './holidays/holiday-period/holiday-period.component';
import { HolidayPeriodDetailsComponent } from './holidays/holiday-period-details/holiday-period-details.component';
import { HolidayPeriodResolver } from './holidays/holiday-period/holiday-period.resolver';
import { AssociationProjCollabComponent } from './associations/association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from './associations/association-proj-collab-details/association-proj-collab-details.component';
import { AssociationProjCollabResolver } from './associations/association-proj-collab.resolver';
import { HolidayPeriodDetailsResolver } from './holidays/holiday-period-details/holiday-period-details.resolver';
import { HolidayPeriodFormComponent } from './holidays/holiday-period-form/holiday-period-form.component';
import { UserStoriesComponent } from './user-stories/user-stories/user-stories.component';
import { UserStoryDetailsComponent } from './user-stories/user-story-details/user-story-details.component';
import { UserStoryFormComponent } from './user-stories/user-story-form/user-story-form.component';
import { UserStoryDetailsResolver } from './user-stories/user-story-details.resolver';
import { AssociationsSprintUserStoryComponent } from './associations-sprint-user-story/associations-sprint-user-story/associations-sprint-user-story.component';
import { AssociationSprintUserStoryFormComponent } from './associations-sprint-user-story/association-sprint-user-story-form/association-sprint-user-story-form.component';
import { AssociationSprintUserStoryDetailsComponent } from './associations-sprint-user-story/association-sprint-user-story-details/association-sprint-user-story-details.component';
import { AssociationSprintUserStoryDetailsResolver } from './associations-sprint-user-story/association-sprint-user-story-details.resolver';
import { UserStoryResolver } from './user-stories/user-story.resolver';
import { AssociationSprintUserStoryResolver } from './associations-sprint-user-story/association-sprint-user-story.resolver';
import { SprintsComponent } from './sprints/sprints/sprints.component';
import { SprintResolver } from './sprints/sprint.resolver';
import { SprintFormComponent } from './sprints/sprint-form/sprint-form.component';
import { SprintDetailsComponent } from './sprints/sprint-details/sprint-details.component';
import { SprintDetailsResolver } from './sprints/sprint-details.resolver';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'collaborators',
        component: CollaboratorsComponent,
        title: 'Collaborators',
        children: [
            {
                path: 'add',
                component: CollaboratorFormComponent,
                title: 'Add Collaborator',
            },
            {
                path: ':id',
                component: CollaboratorDetailsComponent,
                title: 'Collaborator Details',
                resolve: {
                    collaborator: CollaboratorDetailsResolver,
                },

            },
            {
                path: ':id/edit',
                component: CollaboratorFormComponent,
                title: 'Edit Collaborator',
            },
            {
                path: ':id/holidays',
                component: HolidayPeriodComponent,
                title: 'Holidays',
                resolve: {
                    holidays: HolidayPeriodResolver,
                },
                children: [
                    {
                        path: 'add',
                        component: HolidayPeriodFormComponent,
                        title: 'Add Holiday',
                    },
                    {
                        path: ':holidayId',
                        component: HolidayPeriodDetailsComponent,
                        title: 'Holiday Details',
                        resolve: {
                            holiday: HolidayPeriodDetailsResolver,
                        },
                    },
                ],
            },


            {
                path: ':id/associations',
                component: AssociationProjCollabComponent,
                title: 'Associations',
                resolve: {
                    holidays: AssociationProjCollabResolver,
                },
                children: [
                    {
                        path: ':associationId',
                        component: AssociationProjCollabDetailsComponent,
                        title: 'Association Details',
                    },
                ],
            },
        ],
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects',
        children: [
            {
                path: ':id',
                component: ProjectDetailsComponent,
                title: 'Project Details',
            },
        ],
    },
    {
        path: 'userstories',
        component: UserStoriesComponent,
        title: 'User Stories',
        resolve: {
            userStories: UserStoryResolver
        },
        children: [
            {
                path: 'add',
                component: UserStoryFormComponent,
                title: 'Add User Story',
            },
            {
                path: ':id',
                component: UserStoryDetailsComponent,
                title: 'User Story Details',
                resolve: {
                    userStory: UserStoryDetailsResolver,
                },

            },
        ],
    },
    {
        path: 'sprints',
        component: SprintsComponent,
        title: 'Sprints',
        resolve: {
            sprints: SprintResolver
        },
        children: [
            {
                path: 'add',
                component: SprintFormComponent,
                title: 'Add Sprint',
            },
            {
                path: ':id',
                component: SprintDetailsComponent,
                title: 'Sprint Details',
                resolve: {
                    sprint: SprintDetailsResolver,
                },

            },
        ],
    },
    {
        path: 'associations-sprint-userstory',
        component: AssociationsSprintUserStoryComponent,
        title: 'Associations Sprint UserStory',
        resolve: {
            associationsSprintUserStories: AssociationSprintUserStoryResolver
        },
        children: [
            {
                path: 'add',
                component: AssociationSprintUserStoryFormComponent,
                title: 'Add AssociationSprintUserStory',
            },
            {
                path: ':id',
                component: AssociationSprintUserStoryDetailsComponent,
                title: 'AssociationSprintUserStory Details',
                resolve: {
                    associationSprintUserStory: AssociationSprintUserStoryDetailsResolver,
                },

            },
            {
                path: ':id/edit',
                component: AssociationSprintUserStoryFormComponent,
                title: 'Edit AssociationSprintUserStory',
            },

        ],
    },

];
