import { PeriodDate } from '../model/period-date';

export interface CreateProject {
    title: string;
    acronym: string;
    periodDate: PeriodDate;
}