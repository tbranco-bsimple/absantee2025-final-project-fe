import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AssociationSprintUserStoryViewModel } from './models/association-sprint-user-story-view.model';
import { CreateAssociationSprintUserStory } from './models/create-association-sprint-user-story';
import { map, Observable } from 'rxjs';
import { AssociationSprintUserStory } from './models/association-sprint-user-story';
import { AssociationSprintUserStoryMapper } from './models/association-sprint-user-story.mapper';
import { UpdateAssociationSprintUserStory } from './models/update-association-sprint-user-story';

@Injectable({
  providedIn: 'root'
})
export class AssociationSprintUserStoryApiService {

  private cmdUrl = environment.associationSprintUserStoryCmdApiBaseUrl;
  private queryUrl = environment.associationSprintUserStoryQueryApiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getAssociationsSprintUserStory(): Observable<AssociationSprintUserStoryViewModel[]> {
    console.log('Fetching AssociationsSprintUserStory from API');
    return this.httpClient.get<AssociationSprintUserStory[]>(this.queryUrl)
      .pipe(map(associations => associations.map(AssociationSprintUserStoryMapper.toViewModel)));
  }

  getAssociationSprintUserStoryById(id: string): Observable<AssociationSprintUserStoryViewModel> {
    console.log('Fetching AssociationSprintUserStory by ID from API');
    return this.httpClient.get<AssociationSprintUserStory>(this.queryUrl + '/' + id)
      .pipe(map(AssociationSprintUserStoryMapper.toViewModel));
  }

  createAssociation(association: CreateAssociationSprintUserStory): Observable<AssociationSprintUserStoryViewModel> {
    console.log('Adding AssociationsSprintUserStory:', association);
    return this.httpClient.post<AssociationSprintUserStoryViewModel>(this.cmdUrl, association);
  }

  updateAssociation(id: string, association: UpdateAssociationSprintUserStory): Observable<AssociationSprintUserStoryViewModel> {
    console.log('Updateing AssociationsSprintUserStory:', association);
    return this.httpClient.patch<AssociationSprintUserStoryViewModel>(this.cmdUrl + '/' + id, association);
  }

}
