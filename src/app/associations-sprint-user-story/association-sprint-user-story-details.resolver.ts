import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AssociationSprintUserStoryApiService } from './association-sprint-user-story-api.service';
import { Observable } from 'rxjs';
import { AssociationSprintUserStoryViewModel } from './models/association-sprint-user-story-view.model';

@Injectable({
  providedIn: 'root'
})
export class AssociationSprintUserStoryDetailsResolver implements Resolve<Observable<AssociationSprintUserStoryViewModel>> {

  constructor(private service: AssociationSprintUserStoryApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<AssociationSprintUserStoryViewModel> {
    const id = route.paramMap.get('id');
    if (!id) {
      throw new Error('AssociationSprintUserStory ID is missing in route');
    }
    return this.service.getAssociationSprintUserStoryById(id);
  }
}