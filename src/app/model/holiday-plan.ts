import { HolidayPeriod } from './holiday-period';

export interface HolidayPlan {
    id: string;
    collaboratorId: string;
    holidayPeriods: HolidayPeriod[];
}