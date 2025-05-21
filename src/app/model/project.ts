import { PeriodDate } from './period-date';

export interface Project {
    id: number;
    title: string;
    acronym: string;
    periodDate: PeriodDate;
}