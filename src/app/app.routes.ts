import { Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators/collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorFormComponent } from './collaborators/collaborator-form/collaborator-form.component';
import { CollaboratorResolver } from './collaborators/collaborator-resolver';


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
                path: 'details/:id',
                component: CollaboratorDetailsComponent,
                title: 'Collaborators details',
                resolve: {
                    collaborator: CollaboratorResolver
                }
            },
            {
                path: 'add',
                component: CollaboratorFormComponent,
                title: 'Add Collaborator',
            }
        ]
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects',
        children: [
            {
                path: 'details/:id',
                component: ProjectDetailsComponent,
                title: 'Project details',
            }
        ]
    },

];
