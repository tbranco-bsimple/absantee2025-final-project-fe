import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../model/collaborator';
import { environment } from '../../environments/environment';
import { HolidayPeriod } from '../model/holiday-period';
import { AssociationProjCollab } from '../model/association-proj-collab';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorApiService {

    url = environment.apiBaseUrl + '/collaborators/';

    constructor(private httpClient: HttpClient) { }

    getCollaborators(): Observable<Collaborator[]> {
        const res = this.httpClient.get<Collaborator[]>(this.url + 'details');
        res.subscribe(data => console.log('collabs', data));
        return res;
    }

    getCollaboratorsById(id: number): Observable<Collaborator> {
        return this.httpClient.get<Collaborator>(this.url + id);
    }

    getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
        const res = this.httpClient.get<HolidayPeriod[]>(this.url + collaboratorId + '/holidayplan/holidayperiod');
        res.subscribe(data => console.log('holidays', data));
        return res;
    }

    getCollaboratorAssociations(collaboratorId: string): Observable<AssociationProjCollab[]> {
        const res = this.httpClient.get<AssociationProjCollab[]>(this.url + collaboratorId + '/associations');
        res.subscribe(data => console.log('associations', data));
        return res;
    }

    addCollaboratorHoliday(collaboratorId: string, initDate: string, finalDate: string): Observable<HolidayPeriod> {
        const body = { "initDate": initDate, "finalDate": finalDate };
        console.log('Adding holiday for collaborator:', collaboratorId, body);
        return this.httpClient.post<HolidayPeriod>(this.url + collaboratorId + '/holidayplan/holidayperiod', body);
    }
}
