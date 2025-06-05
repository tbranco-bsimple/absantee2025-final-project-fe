import { Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators/collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { HomeComponent } from './home/home.component';


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
    },
    /* {
        path: 'collaborators/:id',
        component: CollaboratorDetailsComponent,
        title: 'Collaborators details',
    }, */
    {
        path: 'projects',
        component: ProjectsComponent,
        title: 'Projects',
    },
    /* {
        path: 'projects/:id',
        component: ProjectDetailsComponent,
        title: 'Project details',
    }, */

];
