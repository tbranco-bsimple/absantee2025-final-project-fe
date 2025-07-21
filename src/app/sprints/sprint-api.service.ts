import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SprintViewModel } from './models/sprint-view.model';
import { Sprint } from './models/sprint';
import { SprintMapper } from './models/sprint-mapper';
import { CreateSprint } from './models/create-sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintApiService {

  private cmdUrl = environment.sprintCmdApiBaseUrl;
  private queryUrl = environment.sprintQueryApiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getSprints(): Observable<SprintViewModel[]> {
    console.log('Fetching Sprints from API');
    return this.httpClient.get<Sprint[]>(this.queryUrl)
      .pipe(map(sprints => sprints.map(SprintMapper.toViewModel)));
  }

  getSprintById(id: string): Observable<SprintViewModel> {
    console.log('Fetching Sprint by ID from API');
    return this.httpClient.get<Sprint>(this.queryUrl + '/' + id)
      .pipe(map(SprintMapper.toViewModel));
  }

  getSprintsByProjectId(projectId: string): Observable<SprintViewModel[]> {
    console.log('Fetching Sprint by ID from API');
    return this.httpClient.get<Sprint[]>(this.queryUrl + '/project/' + projectId)
      .pipe(map(sprints => sprints.map(SprintMapper.toViewModel)));
  }

  createSprint(sprint: CreateSprint): Observable<SprintViewModel> {
    console.log('Adding sprint:', sprint);
    return this.httpClient.post<Sprint>(this.cmdUrl, sprint)
      .pipe(map(SprintMapper.toViewModel));
  }

}
