import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  @Input() users: User[] = [];
  @Output() selectedUserEvent = new EventEmitter<User>();

  constructor() { }

  handleUserSelected(user: User): void {
    this.selectedUserEvent.emit(user);
  }

}
