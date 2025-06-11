import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AssociationProjCollab } from './association-proj-collab';
import { AssociationProjCollabStateService } from './association-proj-collab-state.service';

@Injectable({
    providedIn: 'root'
})
export class AssociationProjCollabResolver implements Resolve<AssociationProjCollab[]> {

    constructor(private service: AssociationProjCollabStateService) { }

    resolve(route: ActivatedRouteSnapshot): AssociationProjCollab[] {
        const id = route.paramMap.get('id');
        if (!id) {
            throw new Error('Collaborator ID is missing in route');
        }
        return this.service.loadCollaboratorAssociations(id);
    }
}