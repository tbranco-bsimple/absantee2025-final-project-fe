import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserStoryApiService } from './user-story-api.service';
import { Observable } from 'rxjs';
import { UserStoryViewModel } from './models/user-story-view.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoryDetailsResolver implements Resolve<Observable<UserStoryViewModel>> {

  constructor(private service: UserStoryApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UserStoryViewModel> {
    const id = route.paramMap.get('id');
    if (!id) {
      throw new Error('User Story ID is missing in route');
    }
    return this.service.getUserStoryById(id);
  }
}