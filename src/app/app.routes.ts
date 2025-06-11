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
import { HolidayPeriodResolver } from './holidays/holiday-period.resolver';
import { AssociationProjCollabComponent } from './associations/association-proj-collab/association-proj-collab.component';
import { AssociationProjCollabDetailsComponent } from './associations/association-proj-collab-details/association-proj-collab-details.component';
import { AssociationProjCollabResolver } from './associations/association-proj-collab.resolver';
import { HolidayPeriodDetailsResolver } from './holidays/holiday-period-details.resolver';
import { CollaboratorResolver } from './collaborators/collaborator.resolver';


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
        /* resolve: {
            collaborators: CollaboratorResolver,
        }, */
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
                path: 'details/:id',
                component: ProjectDetailsComponent,
                title: 'Project Details',
            },
        ],
    },
];
