import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SprintApiService } from './sprint-api.service';
import { Observable } from 'rxjs';
import { SprintViewModel } from './models/sprint-view.model';

@Injectable({
  providedIn: 'root'
})
export class SprintDetailsResolver implements Resolve<Observable<SprintViewModel>> {

  constructor(private service: SprintApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SprintViewModel> {
    console.log('Resolving sprint by Id');
    const id = route.paramMap.get('id');
    if (!id) {
      throw new Error('User Story ID is missing in route');
    }
    return this.service.getSprintById(id);
  }
}