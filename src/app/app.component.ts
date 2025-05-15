import { Component, OnInit } from '@angular/core';
import { UsersComponent } from "./users/users.component";
import { UserService } from './user.service';
import { User } from './user';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-root',
  imports: [UsersComponent, UserDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  usersList: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then(users => {
      this.usersList = users;
    });
  }

  onUserSelect(user: User): void {
    this.selectedUser = { ...user };
    console.log('Selected user:', user);
  }

  onUserUpdated(userUpdated: User): void {
    this.selectedUser = { ...userUpdated };
    this.usersList = this.usersList.map(user =>
      user.id === userUpdated.id ? { ...userUpdated } : user
    );
    console.log('Updated user:', userUpdated);
    console.log('Updated users list:', this.usersList);
  }
}
