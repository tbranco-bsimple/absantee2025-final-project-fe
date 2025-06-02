import { PeriodDateTime } from "./period-date-time"

export interface CreateCollaborator {
    names: string;
    surnames: string;
    email: string;
    deactivationDate: string;
    periodDateTime: PeriodDateTime;
}