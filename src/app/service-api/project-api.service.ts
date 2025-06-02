import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { environment } from '../../environments/environment';
import { AssociationProjCollab } from '../model/association-proj-collab';

@Injectable({
    providedIn: 'root',
})
export class ProjectApiService {

    url = environment.apiBaseUrl + '/project/';

    constructor(private httpClient: HttpClient) { }

    getProjects(): Observable<Project[]> {
        console.log('Fetching projects from API');
        return this.httpClient.get<Project[]>(this.url);
    }

    getProjectAssociations(id: string): Observable<AssociationProjCollab[]> {
        console.log('Fetching associations for project:', id);
        return this.httpClient.get<AssociationProjCollab[]>(this.url + id + '/associations');
    }
}
