import { Injectable, signal } from '@angular/core';
import { Collaborator } from '../collaborator';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorFormService {

    private _isCreatingCollaboratorForm = signal<boolean>(false);
    isCreatingCollaboratorForm = this._isCreatingCollaboratorForm.asReadonly();

    private _isEditingCollaboratorForm = signal<Collaborator | undefined>(undefined);
    isEditingCollaboratorForm = this._isEditingCollaboratorForm.asReadonly();

    private _collaboratorCreated = signal<Collaborator | undefined>(undefined);
    collaboratorCreated = this._collaboratorCreated.asReadonly();

    private _collaboratorEdited = signal<Collaborator | undefined>(undefined);
    collaboratorEdited = this._collaboratorEdited.asReadonly();


    startCreatingCollaboratorForm(): void {
        this._isCreatingCollaboratorForm.set(true);
        this._isEditingCollaboratorForm.set(undefined);
    }

    startEditingCollaboratorForm(collaborator: Collaborator): void {
        this._isCreatingCollaboratorForm.set(false);
        this._isEditingCollaboratorForm.set(collaborator);
    }

    cancelCreatingCollaboratorForm(): void {
        this._isCreatingCollaboratorForm.set(false);
    }

    cancelEditingCollaboratorForm(): void {
        this._isEditingCollaboratorForm.set(undefined);
    }

    setCollaboratorCreated(collaborator: Collaborator): void {
        this._collaboratorCreated.set(collaborator);
    }

    setCollaboratorEdited(collaborator: Collaborator): void {
        this._collaboratorEdited.set(collaborator)
    }

}
