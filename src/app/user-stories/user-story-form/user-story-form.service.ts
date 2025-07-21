import { Injectable, signal } from '@angular/core';
import { UserStoryViewModel } from '../models/user-story-view.model';

@Injectable({
    providedIn: 'root',
})
export class UserStoryFormService {

    private _isCreatingUserStoryForm = signal<boolean>(false);
    isCreatingUserStoryForm = this._isCreatingUserStoryForm.asReadonly();

    private _userStoryCreated = signal<UserStoryViewModel | undefined>(undefined);
    userStoryCreated = this._userStoryCreated.asReadonly();

    startCreatingUserStoryForm(): void {
        this._isCreatingUserStoryForm.set(true);
    }

    cancelCreatingUserStoryForm(): void {
        this._isCreatingUserStoryForm.set(false);
    }

    setUserStoryCreated(userStory: UserStoryViewModel): void {
        this._userStoryCreated.set(userStory);
    }
}
