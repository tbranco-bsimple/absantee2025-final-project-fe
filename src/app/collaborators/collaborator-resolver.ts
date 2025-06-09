import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Collaborator } from './collaborator';
import { CollaboratorStateService } from './collaborator-state.service';

@Injectable({
    providedIn: 'root'
})
export class CollaboratorResolver implements Resolve<Collaborator> {

    constructor(private service: CollaboratorStateService) { }

    resolve(route: ActivatedRouteSnapshot): Collaborator {
        const id = route.paramMap.get('id');
        if (!id) {
            throw new Error('Collaborator ID is missing in route');
        }
        return this.service.loadCollaboratorById(id);
    }
}