import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SprintApiService } from './sprint-api.service';
import { Observable } from 'rxjs';
import { SprintViewModel } from './models/sprint-view.model';

@Injectable({
  providedIn: 'root'
})
export class SprintResolver implements Resolve<Observable<SprintViewModel[]>> {

  constructor(private service: SprintApiService) { }

  resolve(): Observable<SprintViewModel[]> {
    console.log('Resolving sprints');
    return this.service.getSprints();
  }
}