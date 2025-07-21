import { Injectable, signal } from '@angular/core';
import { AssociationSprintUserStoryViewModel } from '../models/association-sprint-user-story-view.model';

@Injectable({
    providedIn: 'root',
})
export class AssociationSprintUserStoryFormService {

    private _isCreatingAssociationForm = signal<boolean>(false);
    isCreatingAssociationForm = this._isCreatingAssociationForm.asReadonly();

    private _isEditingAssociationForm = signal<AssociationSprintUserStoryViewModel | undefined>(undefined);
    isEditingAssociationForm = this._isEditingAssociationForm.asReadonly();

    private _associationCreated = signal<AssociationSprintUserStoryViewModel | undefined>(undefined);
    associationCreated = this._associationCreated.asReadonly();

    private _associationEdited = signal<AssociationSprintUserStoryViewModel | undefined>(undefined);
    associationEdited = this._associationEdited.asReadonly();


    startCreatingAssociationForm(): void {
        this._isCreatingAssociationForm.set(true);
        this._isEditingAssociationForm.set(undefined);
    }

    startEditingAssociationForm(association: AssociationSprintUserStoryViewModel): void {
        this._isCreatingAssociationForm.set(false);
        this._isEditingAssociationForm.set(association);
    }

    cancelCreatingAssociationForm(): void {
        this._isCreatingAssociationForm.set(false);
    }

    cancelEditingAssociationForm(): void {
        this._isEditingAssociationForm.set(undefined);
    }

    setAssociationCreated(association: AssociationSprintUserStoryViewModel): void {
        this._associationCreated.set(association);
    }

    setAssociationEdited(association: AssociationSprintUserStoryViewModel): void {
        this._associationEdited.set(association)
    }

}
