import { FormControl } from '@angular/forms';
import { Priority } from './priority.enum';
import { Risk } from './risk.enum';

export type UserStoryForm = {
    description: FormControl<string | null>;
    priority: FormControl<Priority | null>;
    risk: FormControl<Risk | null>;
};