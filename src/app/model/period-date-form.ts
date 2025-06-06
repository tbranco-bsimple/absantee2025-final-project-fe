import { FormControl } from "@angular/forms";

export type PeriodDateForm = {
    initDate: FormControl<string | null>;
    finalDate: FormControl<string | null>;
};