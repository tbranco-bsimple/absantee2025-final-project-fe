import { FormControl, FormGroup } from "@angular/forms";
import { PeriodDateTimeForm } from "../model/period-date-time-form";

export type CollaboratorForm = {
    names: FormControl<string | null>;
    surnames: FormControl<string | null>;
    email: FormControl<string | null>;
    deactivationDate: FormControl<string | null>;
    periodDateTime: FormGroup<PeriodDateTimeForm>;
};