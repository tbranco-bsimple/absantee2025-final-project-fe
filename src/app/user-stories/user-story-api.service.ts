import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserStory } from './models/user-story';
import { UserStoryMapper } from './models/user-story.mapper';
import { UserStoryViewModel } from './models/user-story-view.model';
import { CreateUserStory } from './models/create-user-story';

@Injectable({
  providedIn: 'root'
})
export class UserStoryApiService {

  private cmdUrl = environment.userStoryCmdApiBaseUrl;
  private queryUrl = environment.userStoryQueryApiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getUserStories(): Observable<UserStoryViewModel[]> {
    console.log('Fetching UserStories from API');
    return this.httpClient.get<UserStory[]>(this.queryUrl)
      .pipe(map(userStories => userStories.map(UserStoryMapper.toViewModel)));
  }

  getUserStoryById(id: string): Observable<UserStoryViewModel> {
    console.log('Fetching UserStory by ID from API');
    return this.httpClient.get<UserStory>(this.queryUrl + '/' + id)
      .pipe(map(UserStoryMapper.toViewModel));
  }

  createUserStory(userStory: CreateUserStory): Observable<UserStoryViewModel> {
    console.log('Adding user story:', userStory);
    return this.httpClient.post<UserStoryViewModel>(this.cmdUrl, userStory);
  }
}
