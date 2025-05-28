import { Injectable, signal } from '@angular/core';
import { AssociationProjCollab } from '../model/association-proj-collab';
import { AssociationProjCollabService } from '../service/assocation-proj-collab.service';

@Injectable({
    providedIn: 'root',
})
export class AssociationProjCollabStateService {

    private _associations = signal<AssociationProjCollab[]>([]);
    readonly associations = this._associations.asReadonly();

    private _associationDetails = signal<AssociationProjCollab | null>(null);
    readonly associationDetails = this._associationDetails.asReadonly();

    constructor(private associationService: AssociationProjCollabService) { }

    loadAssociations(): void {
        this._associations.set(this.associationService.getAssociations());
    }

    loadAssociationsForCollaborator(userId: string): void {
        this._associationDetails.set(this.associationService.getAssociationsByCollaboratorId(userId));
    }

    setSelectedAssociation(association: AssociationProjCollab | null) {
        this._associationDetails.set(association);
    }

    updateAssociation(newAssociation: AssociationProjCollab) {
        this._associations.update(list =>
            list.map(a => a.id === newAssociation.id ? { ...newAssociation } : a)
        );
        if (this._associationDetails()?.id === newAssociation.id) {
            this._associationDetails.set({ ...newAssociation });
        }
    }
}
