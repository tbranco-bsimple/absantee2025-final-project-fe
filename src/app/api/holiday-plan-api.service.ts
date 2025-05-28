import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayPlan } from '../model/holiday-plan';
import { HolidayPeriod } from '../model/holiday-period';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HolidayPlanApiService {

    url = 'http://localhost:5073/api/holidayplans';
    url2 = 'http://localhost:5073/api/collaborators';

    constructor(private httpClient: HttpClient) { }

    getHolidayPlanByCollabId(id: string): Observable<HolidayPeriod> {
        return this.httpClient.get<HolidayPeriod>(this.url2 + id + '/holidayPlan/holidayPeriod');
    }

    getHolidayPlans(): Observable<HolidayPlan[]> {
        return this.httpClient.get<HolidayPlan[]>(this.url);
    }

    getHolidayPlanById(id: number): Observable<HolidayPlan> {
        return this.httpClient.get<HolidayPlan>(this.url + id);
    }

    getHolidayPeriods(): Observable<HolidayPeriod[]> {
        return this.httpClient.get<HolidayPeriod[]>(this.url + 'holidayperiods');
    }

    getHolidayPeriodById(id: number): Observable<HolidayPeriod> {
        return this.httpClient.get<HolidayPeriod>(this.url + 'holidayperiods' + id);
    }
}
