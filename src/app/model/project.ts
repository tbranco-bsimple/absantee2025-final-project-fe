import { PeriodDate } from './period-date';

export interface Project {
    id: string;
    title: string;
    acronym: string;
    periodDate: PeriodDate;
}