import { PeriodDate } from './period-date';

export interface AssociationProjCollab {
    id: string;
    collaboratorId: string;
    projectId: string;
    period: PeriodDate;
}