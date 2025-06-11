import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HolidayPeriod } from './holiday-period';
import { CollaboratorApiService } from '../collaborators/collaborator-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HolidayPeriodDetailsResolver implements Resolve<Observable<HolidayPeriod>> {

    constructor(private service: CollaboratorApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<HolidayPeriod> {
        const id = route.paramMap.get('id');
        const holidayId = route.paramMap.get('holidayId');
        if (!id || !holidayId) {
            throw new Error('Collab ID or HolidayPeriod ID is missing in route');
        }
        return this.service.getCollaboratorHolidayById(id, holidayId);
    }
}