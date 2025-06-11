import { Injectable, signal } from '@angular/core';
import { CollaboratorApiService } from './collaborator-api.service';
import { HolidayPeriod } from '../holidays/holiday-period';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorStateService {

    private _collaboratorHolidays = signal<HolidayPeriod[]>([]);
    readonly collaboratorHolidays = this._collaboratorHolidays.asReadonly();

    private _collaboratorHolidayDetails = signal<HolidayPeriod | null>(null);
    readonly collaboratorHolidayDetails = this._collaboratorHolidayDetails.asReadonly();

    constructor(private collaboratorApiService: CollaboratorApiService) { }

    setSelectedHolidayPeriod(holidayPeriod: HolidayPeriod | null): void {
        this._collaboratorHolidayDetails.set(holidayPeriod);
    }

    loadCollaboratorHolidays(id: string): void {
        this.collaboratorApiService.getCollaboratorHolidays(id).subscribe({
            next: (holidays) => this._collaboratorHolidays.set(holidays),
            error: (err) => {
                console.error('Error loading collaborator holidays:', err);
            }
        });
    }

    loadCollaboratorHolidayById(id: string): HolidayPeriod {
        const holiday = this._collaboratorHolidays().find(holiday => holiday.id === id);
        if (holiday == undefined) {
            console.error('Holiday period not found in state:', id);
            throw new Error(`Holiday period with ID ${id} not found in state.`);
        }
        return holiday;
    }

    addHolidayPeriod(collabId: string, initDate: string, finalDate: string): void {
        this.collaboratorApiService.addCollaboratorHoliday(collabId, initDate, finalDate).subscribe({
            next: (newHoliday: HolidayPeriod) => {
                this._collaboratorHolidays.update(list => [...list, newHoliday]);
            },
            error: (err) => console.error('Failed to add holiday period:', err)
        });
    }

    updateHolidayPeriod(collaboratorId: string, updatedHolidayPeriod: HolidayPeriod): void {
        this.collaboratorApiService.updateCollaboratorHoliday(collaboratorId, updatedHolidayPeriod).subscribe({
            next: (updatedHoliday) => {
                this._collaboratorHolidays.update(list =>
                    list.map(holiday =>
                        holiday.id === updatedHoliday.id ? updatedHoliday : holiday
                    )
                );
            },
            error: (err) => console.error('Failed to update holiday period:', err)
        });
    }
}
