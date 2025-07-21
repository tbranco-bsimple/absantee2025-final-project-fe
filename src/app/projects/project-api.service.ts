import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from './project';
import { environment } from '../../environments/environment';
import { AssociationProjCollab } from '../associations/association-proj-collab';
import { CreateProject } from './create-project';

import projects from './projects.json';

@Injectable({
    providedIn: 'root',
})
export class ProjectApiService {

    url = environment.apiBaseUrl + '/project/';

    constructor(private httpClient: HttpClient) { }

    addProject(project: CreateProject): Observable<Project> {
        console.log('Adding project:', project);
        return this.httpClient.post<Project>(this.url, project);
    }

    getProjects(): Observable<Project[]> {
        console.log('Fetching projects from API');
        return this.httpClient.get<Project[]>(this.url);
    }

    getProjectAssociations(id: string): Observable<AssociationProjCollab[]> {
        console.log('Fetching associations for project:', id);
        return this.httpClient.get<AssociationProjCollab[]>(this.url + id + '/associations');
    }

    updateProject(project: Project): Observable<Project> {
        console.log('Updating project:', project);
        return this.httpClient.put<Project>(this.url, project);
    }



    getAllProjectsFromJson(): Observable<Project[]> {
        return of(projects);
    }

    getProjectFromJsonById(id: string): Observable<Project | undefined> {
        return of(projects.find(p => p.id === id));
    }


}
