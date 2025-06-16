import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateCollaborator } from './create-collaborator';
import { Collaborator } from './collaborator';
import { HolidayPeriod } from '../holidays/holiday-period';
import { AssociationProjCollab } from '../associations/association-proj-collab';
import { CreateHolidayPeriod } from '../holidays/create-holiday-period';


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

    addCollaboratorHoliday(collaboratorId: string, holidayPeriod: CreateHolidayPeriod): Observable<HolidayPeriod> {
        console.log('Adding holiday for collaborator:', collaboratorId, holidayPeriod);
        return this.httpClient.post<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod', holidayPeriod);
    }

    getCollaborators(): Observable<Collaborator[]> {
        console.log('Fetching collaborators from API');
        return this.httpClient.get<Collaborator[]>(this.url + 'details');
    }

    getCollaboratorById(collaboratorId: string): Observable<Collaborator> {
        console.log('Fetching collaborator by ID:', collaboratorId);
        return this.httpClient.get<Collaborator>(this.url + collaboratorId + '/details');
    }

    getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
        console.log('Fetching holidays for collaborator:', collaboratorId);
        return this.httpClient.get<HolidayPeriod[]>(this.url + collaboratorId + '/holidayplan/holidayperiod');
    }

    getCollaboratorHolidayById(collaboratorId: string, holidayId: string): Observable<HolidayPeriod> {
        console.log('Fetching holiday by ID for collaborator:', collaboratorId, holidayId);
        return this.httpClient.get<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod/' + holidayId);
    }

    getCollaboratorAssociations(collaboratorId: string): Observable<AssociationProjCollab[]> {
        console.log('Fetching associations for collaborator:', collaboratorId);
        return this.httpClient.get<AssociationProjCollab[]>(this.url + collaboratorId + '/associations');
    }

    getCollaboratorAssociationById(collaboratorId: string, assocationId: string): Observable<AssociationProjCollab> {
        console.log('Fetching associations by ID for collaborator:', collaboratorId);
        return this.httpClient.get<AssociationProjCollab>(this.url + collaboratorId + '/associations' + assocationId);
    }

    updateCollaborator(collaborator: Collaborator): Observable<Collaborator> {
        console.log('Updating collaborator:', collaborator);
        return this.httpClient.put<Collaborator>(this.url, collaborator);
    }

    updateCollaboratorHoliday(collaboratorId: string, updatedHolidayPeriod: HolidayPeriod): Observable<HolidayPeriod> {
        console.log('Updating holiday period for collaborator:', collaboratorId, updatedHolidayPeriod);
        return this.httpClient.put<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod', updatedHolidayPeriod);
    }
}
