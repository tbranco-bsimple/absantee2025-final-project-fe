import { FormControl } from '@angular/forms';

export type AssociationSprintUserStoryForm = {
    id: FormControl<string | null>;
    sprintId: FormControl<string | null>;
    userStoryId: FormControl<string | null>;
    collaboratorId: FormControl<string | null>;
    effortHours: FormControl<number | null>;
    completionPercentage: FormControl<number | null>;
};