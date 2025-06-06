import { FormControl, FormGroup } from "@angular/forms";
import { PeriodDateForm } from "../model/period-date-form";

export type ProjectForm = {
    title: FormControl<string | null>;
    acronym: FormControl<string | null>;
    periodDate: FormGroup<PeriodDateForm>;
};