import { Injectable, signal } from '@angular/core';
import { Collaborator } from '../model/collaborator';
import { CollaboratorApiService } from '../service-api/collaborator-api.service';
import { HolidayPeriod } from '../model/holiday-period';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorStateService {

    private _collaborators = signal<Collaborator[]>([]);
    readonly collaborators = this._collaborators.asReadonly();

    private _collaboratorDetails = signal<Collaborator | null>(null);
    readonly collaboratorDetails = this._collaboratorDetails.asReadonly();

    private _collaboratorHolidays = signal<HolidayPeriod[]>([]);
    readonly collaboratorHolidays = this._collaboratorHolidays.asReadonly();

    private _collaboratorHolidayDetails = signal<HolidayPeriod | null>(null);
    readonly collaboratorHolidayDetails = this._collaboratorHolidayDetails.asReadonly();

    constructor(private collaboratorApiService: CollaboratorApiService) { }

    loadCollaborators(): void {
        this.collaboratorApiService.getCollaborators().subscribe({
            next: (collaborators) => this._collaborators.set(collaborators),
            error: (err) => {
                console.error('Error loading collaborators:', err);
            }
        });
    }

    loadCollaboratorHolidays(id: string): void {
        this.collaboratorApiService.getCollaboratorHolidays(id).subscribe({
            next: (holidays) => this._collaboratorHolidays.set(holidays),
            error: (err) => {
                console.error('Error loading collaborator holidays:', err);
            }
        });
    }

    setSelectedCollaborator(collaborator: Collaborator | null): void {
        this._collaboratorDetails.set(collaborator);
    }
    setSelectedHolidayPeriod(holidayPeriod: HolidayPeriod | null): void {
        this._collaboratorHolidayDetails.set(holidayPeriod);
    }

    addHolidayPeriod(collabId: string, initDate: string, finalDate: string): void {
        this.collaboratorApiService.addCollaboratorHoliday(collabId, initDate, finalDate).subscribe({
            next: (newHoliday: HolidayPeriod) => {
                this._collaboratorHolidays.update(list => [...list, newHoliday]);
            },
            error: (err) => console.error('Failed to add holiday period:', err)
        });
    }

    updateCollaborator(newCollaborator: Collaborator): void {
        this._collaborators.update(list =>
            list.map(c => c.collabId === newCollaborator.collabId ? { ...newCollaborator } : c)
        );
        if (this._collaboratorDetails()?.collabId === newCollaborator.collabId) {
            this._collaboratorDetails.set({ ...newCollaborator });
        }
    }

    updateHolidayPeriod(newHolidayPeriod: HolidayPeriod): void {
        this._collaboratorHolidays.update(list =>
            list.map(h => h.id === newHolidayPeriod.id ? { ...newHolidayPeriod } : h)
        );
        if (this._collaboratorHolidayDetails()?.id === newHolidayPeriod.id) {
            this._collaboratorHolidayDetails.set({ ...newHolidayPeriod });
        }
    }
}
