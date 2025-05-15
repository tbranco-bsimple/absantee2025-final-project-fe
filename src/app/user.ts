import { PeriodDateTime } from "./period-date-time";

export interface User {
    id: number,
    names: string,
    surnames: string,
    email: string,
    periodDateTime: PeriodDateTime
}