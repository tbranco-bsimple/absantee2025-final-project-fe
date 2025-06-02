import { Injectable, signal } from '@angular/core';
import { Collaborator } from '../model/collaborator';
import { CollaboratorApiService } from '../service-api/collaborator-api.service';
import { HolidayPeriod } from '../model/holiday-period';
import { CreateCollaborator } from '../model/create-collaborator';

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

    addCollaborator(newCollaborator: CreateCollaborator): void {
        this.collaboratorApiService.addCollaborator(newCollaborator).subscribe({
            next: (newCollab: Collaborator) => {
                this._collaborators.update(list => [...list, newCollab]);
            },
            error: (err) => console.error('Failed to add holiday period:', err)
        });
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
        this.collaboratorApiService.updateCollaborator(newCollaborator).subscribe({
            next: (updatedCollaborator) => {
                this._collaborators.update(list =>
                    list.map(collaborator =>
                        collaborator.collabId === updatedCollaborator.collabId ? updatedCollaborator : collaborator
                    )
                );
            },
            error: (err) => console.error('Failed to update collaborator:', err)
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
