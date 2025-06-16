import { Injectable, signal } from '@angular/core';
import { HolidayPeriod } from '../holiday-period';
@Injectable({
    providedIn: 'root',
})
export class HolidayPeriodFormService {

    private _isCreatingHolidayPeriodForm = signal<boolean>(false);
    isCreatingHolidayPeriodForm = this._isCreatingHolidayPeriodForm.asReadonly();

    private _isEditingHolidayPeriodForm = signal<HolidayPeriod | undefined>(undefined);
    isEditingHolidayPeriodForm = this._isEditingHolidayPeriodForm.asReadonly();

    private _holidayPeriodCreated = signal<HolidayPeriod | undefined>(undefined);
    holidayPeriodCreated = this._holidayPeriodCreated.asReadonly();

    private _holidayPeriodEdited = signal<HolidayPeriod | undefined>(undefined);
    holidayPeriodEdited = this._holidayPeriodEdited.asReadonly();


    startCreatingHolidayPeriodForm(): void {
        this._isCreatingHolidayPeriodForm.set(true);
        this._isEditingHolidayPeriodForm.set(undefined);
    }

    startEditingHolidayPeriodForm(holidayPeriod: HolidayPeriod): void {
        this._isCreatingHolidayPeriodForm.set(false);
        this._isEditingHolidayPeriodForm.set(holidayPeriod);
    }

    cancelCreatingHolidayPeriodForm(): void {
        this._isCreatingHolidayPeriodForm.set(false);
    }

    cancelEditingHolidayPeriodForm(): void {
        this._isEditingHolidayPeriodForm.set(undefined);
    }

    setHolidayPeriodCreated(holidayPeriod: HolidayPeriod): void {
        this._holidayPeriodCreated.set(holidayPeriod);
    }

    setHolidayPeriodEdited(holidayPeriod: HolidayPeriod): void {
        this._holidayPeriodEdited.set(holidayPeriod)
    }

}
