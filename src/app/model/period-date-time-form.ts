import { FormControl } from "@angular/forms";

export type PeriodDateTimeForm = {
    _initDate: FormControl<string | null>;
    _finalDate: FormControl<string | null>;
};