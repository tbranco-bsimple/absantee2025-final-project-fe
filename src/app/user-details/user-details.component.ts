import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnChanges, OnDestroy {

  @Input() userDetails: User | null = null;
  @Output() userUpdated = new EventEmitter<User>();
  isEditing = false;

  ngOnChanges(): void {
    this.isEditing = false;
  }

  ngOnDestroy(): void {
    this.userDetails = null;
    this.isEditing = false;
  }

  edit() {
    this.isEditing = true;
    console.log('editing');
  }

  onEdit(user: User) {
    this.userUpdated.emit(user);
    this.isEditing = false;
  }
}

