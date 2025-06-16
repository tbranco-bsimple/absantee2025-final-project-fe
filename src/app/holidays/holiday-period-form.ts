import { FormControl } from "@angular/forms";

export type HolidayPeriodForm = {
    initDate: FormControl<string | null>;
    finalDate: FormControl<string | null>;
};