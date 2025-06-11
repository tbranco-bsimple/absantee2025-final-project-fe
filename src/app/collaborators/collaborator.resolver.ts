import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Collaborator } from './collaborator';
import { CollaboratorApiService } from './collaborator-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollaboratorResolver implements Resolve<Observable<Collaborator[]>> {

    constructor(private service: CollaboratorApiService) { }

    resolve(): Observable<Collaborator[]> {
        console.log('Resolving collaborators');
        return this.service.getCollaborators();
    }
}