import { PeriodDate } from "../model/period-date";

export interface AssociationProjCollab {
    id: string;
    collaboratorId: string;
    collaboratorEmail: string;
    projectId: string;
    projectAcronym: string;
    periodDate: PeriodDate;
}
