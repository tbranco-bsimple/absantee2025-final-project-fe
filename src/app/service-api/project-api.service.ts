import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { environment } from '../../environments/environment';

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
}
