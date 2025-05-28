import { Injectable, signal } from '@angular/core';
import { HolidayPlan } from '../model/holiday-plan';
import { HolidayPlanApiService } from '../api/holiday-plan-api.service';
import { HolidayPlanService } from '../service/holiday-plan.service';
import { HolidayPeriod } from '../model/holiday-period';

@Injectable({
    providedIn: 'root',
})
export class HolidayPlanStateService {

    private _holidayPlans = signal<HolidayPlan[]>([]);
    readonly holidayPlans = this._holidayPlans.asReadonly();

    private _holidayPlanDetails = signal<HolidayPlan | null>(null);
    readonly holidayPlanDetails = this._holidayPlanDetails.asReadonly();

    constructor(private holidayPlanService: HolidayPlanService, private holidayPlanApiService: HolidayPlanApiService) { }

    loadHolidayPlans(): void {
        this._holidayPlans.set(this.holidayPlanService.getHolidayPlans());
    }

    loadHolidayPlanForCollaborator(userId: string): void {
        console.log('Loading holiday plan for user:', userId);
        const holidayPlanDetailsStatic = this.holidayPlanService.getHolidayPlanByCollaboratorId(userId);
        const holidayPlanDetails = this.holidayPlanApiService.getHolidayPlanByCollabId(userId);
        this._holidayPlanDetails.set(holidayPlanDetailsStatic)
    }

    setSelectedHolidayPlan(holidayPlan: HolidayPlan | null) {
        this._holidayPlanDetails.set(holidayPlan);
    }

    updateHolidayPlan(newHolidayPlan: HolidayPlan) {
        this._holidayPlans.update(list =>
            list.map(p => p.id === newHolidayPlan.id ? { ...newHolidayPlan } : p)
        );
        if (this._holidayPlanDetails()?.id === newHolidayPlan.id) {
            this._holidayPlanDetails.set({ ...newHolidayPlan });
        }
    }

}
