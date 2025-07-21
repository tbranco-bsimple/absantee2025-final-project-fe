import { Injectable, signal } from '@angular/core';
import { SprintViewModel } from '../models/sprint-view.model';

@Injectable({
    providedIn: 'root',
})
export class SprintFormService {

    private _isCreatingSprintForm = signal<boolean>(false);
    isCreatingSprintForm = this._isCreatingSprintForm.asReadonly();

    private _sprintCreated = signal<SprintViewModel | undefined>(undefined);
    sprintCreated = this._sprintCreated.asReadonly();

    startCreatingSprintForm(): void {
        this._isCreatingSprintForm.set(true);
    }

    cancelCreatingSprintForm(): void {
        this._isCreatingSprintForm.set(false);
    }

    setSprintCreated(sprint: SprintViewModel): void {
        this._sprintCreated.set(sprint);
    }
}
