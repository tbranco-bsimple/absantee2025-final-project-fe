import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render app-users', () => {
    let fixtureUsers = TestBed.createComponent(UsersComponent)
    let users = fixtureUsers.componentInstance;
    expect(users).toBeTruthy();
  });

  it('should not render app-user-details', () => {
    app.selectedUser = null;
    TestBed.createComponent(UserDetailsComponent)
    let exists = fixture.nativeElement.querySelector('app-user-details');
    expect(exists).toBeNull();
  });

});
