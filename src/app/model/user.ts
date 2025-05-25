import { PeriodDateTime } from "./period-date-time";

export interface User {
    id: string,
    names: string,
    surnames: string,
    email: string,
    periodDateTime: PeriodDateTime
}