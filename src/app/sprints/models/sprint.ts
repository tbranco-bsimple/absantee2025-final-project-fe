import { PeriodDate } from "../../model/period-date";

export interface Sprint {
    id: string;
    projectId: string;
    period: PeriodDate;
    totalEffortHours: number;
}