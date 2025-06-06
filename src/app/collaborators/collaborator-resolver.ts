import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Collaborator } from './collaborator';
import { CollaboratorApiService } from './collaborator-api.service';

@Injectable({
    providedIn: 'root'
})
export class CollaboratorResolver implements Resolve<Collaborator> {

    constructor(private service: CollaboratorApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Collaborator> {
        const id = route.paramMap.get('id');
        if (!id) {
            throw new Error('Collaborator ID is missing in route');
        }
        return this.service.getCollaboratorById(id);
    }
}