import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { User } from '../model/user';
import { AssociationProjCollabDetailsComponent } from '../association-proj-collab-details/association-proj-collab-details.component';
import { HolidayPlanDetailsComponent } from '../holiday-plan-details/holiday-plan-details.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, AssociationProjCollabDetailsComponent, HolidayPlanDetailsComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnDestroy {

  @Input() users: User[] = [];
  @Output() selectedUserEvent = new EventEmitter<User>();
  selectedAssociationsUserId: string | null = null;
  selectedHolidaysUserId: string | null = null;

  constructor() { }

  ngOnDestroy(): void {
    this.selectedAssociationsUserId = null;
    this.selectedHolidaysUserId = null;
  }

  handleUserSelected(user: User): void {
    this.selectedUserEvent.emit(user);
    this.selectedAssociationsUserId = null;
    this.selectedHolidaysUserId = null;
  }

  openAssociations(userId: string) {
    this.selectedAssociationsUserId = userId;
    this.selectedHolidaysUserId = null;
  }

  openHolidays(userId: string) {
    this.selectedHolidaysUserId = userId;
    this.selectedAssociationsUserId = null;
  }

}
