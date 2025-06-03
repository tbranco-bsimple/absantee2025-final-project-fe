import { Injectable, signal } from '@angular/core';
import { CollaboratorApiService } from '../collaborators/collaborator-api.service';
import { ProjectApiService } from '../projects/project-api.service';
import { AssociationProjCollab } from './association-proj-collab';

@Injectable({
    providedIn: 'root',
})
export class AssociationProjCollabStateService {

    private _associations = signal<AssociationProjCollab[]>([]);
    readonly associations = this._associations.asReadonly();

    private _associationDetails = signal<AssociationProjCollab | null>(null);
    readonly associationDetails = this._associationDetails.asReadonly();

    constructor(private collaboratorApiService: CollaboratorApiService,
        private projectApiService: ProjectApiService
    ) { }

    setSelectedAssociation(association: AssociationProjCollab | null): void {
        this._associationDetails.set(association);
    }

    loadCollaboratorAssociations(id: string): void {
        this.collaboratorApiService.getCollaboratorAssociations(id).subscribe({
            next: (associations) => this._associations.set(associations),
            error: (err) => {
                console.error('Error loading collaborator associations:', err);
            }
        });
    }

    loadProjectAssociations(id: string): void {
        this.projectApiService.getProjectAssociations(id).subscribe({
            next: (associations) => this._associations.set(associations),
            error: (err) => {
                console.error('Error loading project associations:', err);
            }
        });
    }

    updateAssociation(newAssociation: AssociationProjCollab): void {
        this._associations.update(list =>
            list.map(a => a.id === newAssociation.id ? { ...newAssociation } : a)
        );
        if (this._associationDetails()?.id === newAssociation.id) {
            this._associationDetails.set({ ...newAssociation });
        }
    }
}
