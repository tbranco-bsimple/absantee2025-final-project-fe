import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AssociationSprintUserStoryApiService } from './association-sprint-user-story-api.service';
import { AssociationSprintUserStoryViewModel } from './models/association-sprint-user-story-view.model';

@Injectable({
  providedIn: 'root'
})
export class AssociationSprintUserStoryResolver implements Resolve<Observable<AssociationSprintUserStoryViewModel[]>> {

  constructor(private service: AssociationSprintUserStoryApiService) { }

  resolve(): Observable<AssociationSprintUserStoryViewModel[]> {
    console.log('Resolving AssociationsSprintUserStory');
    return this.service.getAssociationsSprintUserStory();
  }
}