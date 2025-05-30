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
        return this.httpClient.get<Project[]>(this.url);
    }

    getProjectById(id: number): Observable<Project> {
        return this.httpClient.get<Project>(this.url + id);
    }

    getProjectAssociations(id: string): Observable<AssociationProjCollab[]> {
        const res = this.httpClient.get<AssociationProjCollab[]>(this.url + id + '/associations');
        res.subscribe(data => console.log('associations', data));
        return res;
    }
}
