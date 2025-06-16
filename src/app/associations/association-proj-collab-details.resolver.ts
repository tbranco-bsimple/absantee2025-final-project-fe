import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AssociationProjCollab } from './association-proj-collab';
import { CollaboratorApiService } from '../collaborators/collaborator-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssociationProjCollabResolver implements Resolve<Observable<AssociationProjCollab>> {

    constructor(private service: CollaboratorApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AssociationProjCollab> {
        const id = route.parent?.paramMap.get('id');
        const associationId = route.paramMap.get('associationId');
        if (!id) {
            throw new Error('Collaborator ID is missing in route');
        }
        if (!associationId) {
            throw new Error('Association ID is missing in route');
        }
        return this.service.getCollaboratorAssociationById(id, associationId);
    }
}