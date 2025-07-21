import { FormControl } from '@angular/forms';

export type SprintForm = {
    projectId: FormControl<string | null>;
    initDate: FormControl<string | null>;
    finalDate: FormControl<string | null>;
    totalEffortHours: FormControl<number | null>;
};