import { PeriodDateTime } from "../model/period-date-time";

export interface Collaborator {
    collabId: string;
    userId: string;
    names: string;
    surnames: string;
    email: string;
    userPeriod: PeriodDateTime;
    collaboratorPeriod: PeriodDateTime;
}
