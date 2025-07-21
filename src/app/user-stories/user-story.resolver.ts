import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserStoryApiService } from './user-story-api.service';
import { Observable } from 'rxjs';
import { UserStoryViewModel } from './models/user-story-view.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoryResolver implements Resolve<Observable<UserStoryViewModel[]>> {

  constructor(private service: UserStoryApiService) { }

  resolve(): Observable<UserStoryViewModel[]> {
    console.log('Resolving userStories');
    return this.service.getUserStories();
  }
}