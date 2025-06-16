import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HolidayPeriod } from '../holiday-period';
import { Observable } from 'rxjs';
import { CollaboratorApiService } from '../../collaborators/collaborator-api.service';

@Injectable({
    providedIn: 'root'
})
export class HolidayPeriodResolver implements Resolve<Observable<HolidayPeriod[]>> {

    constructor(private service: CollaboratorApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<HolidayPeriod[]> {
        const id = route.paramMap.get('id');
        if (!id) {
            throw new Error('Collaborator ID is missing in route');
        }
        return this.service.getCollaboratorHolidays(id);
    }
}