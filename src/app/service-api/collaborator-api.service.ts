import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../model/collaborator';
import { environment } from '../../environments/environment';
import { HolidayPeriod } from '../model/holiday-period';
import { AssociationProjCollab } from '../model/association-proj-collab';
import { CreateCollaborator } from '../model/create-collaborator';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorApiService {

    url = environment.apiBaseUrl + '/collaborators/';

    constructor(private httpClient: HttpClient) { }

    addCollaborator(collaborator: CreateCollaborator): Observable<Collaborator> {
        console.log('Adding collaborator:', collaborator);
        return this.httpClient.post<Collaborator>(this.url, collaborator);
    }

    addCollaboratorHoliday(collaboratorId: string, initDate: string, finalDate: string): Observable<HolidayPeriod> {
        const body = { "initDate": initDate, "finalDate": finalDate };
        console.log('Adding holiday for collaborator:', collaboratorId, body);
        return this.httpClient.post<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod', body);
    }

    getCollaborators(): Observable<Collaborator[]> {
        console.log('Fetching collaborators from API');
        return this.httpClient.get<Collaborator[]>(this.url + 'details');
    }

    getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
        console.log('Fetching holidays for collaborator:', collaboratorId);
        return this.httpClient.get<HolidayPeriod[]>(this.url + collaboratorId + '/holidayplan/holidayperiod');
    }

    getCollaboratorAssociations(collaboratorId: string): Observable<AssociationProjCollab[]> {
        console.log('Fetching associations for collaborator:', collaboratorId);
        return this.httpClient.get<AssociationProjCollab[]>(this.url + collaboratorId + '/associations');
    }

    updateCollaborator(updatedCollaborator: Collaborator): Observable<Collaborator> {
        console.log('Updating collaborator:', updatedCollaborator);
        return this.httpClient.put<Collaborator>(this.url + updatedCollaborator.collabId, updatedCollaborator);
    }

    updateCollaboratorHoliday(collaboratorId: string, updatedHolidayPeriod: HolidayPeriod): Observable<HolidayPeriod> {
        console.log('Updating holiday period for collaborator:', collaboratorId, updatedHolidayPeriod);
        return this.httpClient.put<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod', updatedHolidayPeriod);
    }
}
