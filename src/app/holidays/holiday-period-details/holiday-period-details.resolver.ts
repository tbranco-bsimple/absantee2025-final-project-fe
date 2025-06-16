import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HolidayPeriod } from '../holiday-period';
import { CollaboratorApiService } from '../../collaborators/collaborator-api.service';

@Injectable({
    providedIn: 'root'
})
export class HolidayPeriodDetailsResolver implements Resolve<Observable<HolidayPeriod>> {

    constructor(private service: CollaboratorApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<HolidayPeriod> {
        const id = route.parent?.paramMap.get('id');
        const holidayId = route.paramMap.get('holidayId');
        if (!id) {
            throw new Error('Collab ID is missing in route');
        }
        if (!holidayId) {
            throw new Error('HolidayPeriod ID is missing in route');
        }
        return this.service.getCollaboratorHolidayById(id, holidayId);
    }
}