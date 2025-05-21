import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { By } from '@angular/platform-browser';

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

  it(`should have the 'Absantee' title`, () => {
    expect(app.title).toEqual('Absantee');
  });

  it('should render app-users by default', () => {
    let exists = fixture.nativeElement.querySelector('app-users');
    expect(exists).not.toBeNull();
  });

  it('should not render app-user-details by default', () => {
    let exists = fixture.nativeElement.querySelector('app-user-details');
    expect(exists).toBeNull();
  });

  it('should render app-user-details with user', () => {
    app.selectedUser = {
      id: 1,
      names: 'John',
      surnames: 'Doe',
      email: 'email@email.com',
      periodDateTime: {
        _initDate: new Date('2024-01-01'),
        _endDate: new Date('2024-12-31')
      }
    };
    let fixtureDetails = TestBed.createComponent(UserDetailsComponent);
    let details = fixtureDetails.componentInstance;
    expect(details).toBeTruthy();
  });

  // NB: this test does not respects the data in AppComponent
  it('should update selected user when list emits selection', () => {
    // Find the child list component
    const userComponent: UsersComponent = fixture.debugElement.query(By.directive(UsersComponent))?.componentInstance;

    // Simulate selection
    const testUser = {
      id: 1,
      names: 'John',
      surnames: 'Doe',
      email: 'email@email.com',
      periodDateTime: {
        _initDate: new Date('2024-01-01'),
        _endDate: new Date('2024-12-31')
      }
    };
    userComponent.selectedUserEvent.emit(testUser);
    fixture.detectChanges();

    // Check that AppComponent updated its selection
    expect(app.selectedUser).toEqual(testUser);

    // Check that the details component received the input
    const detailsComponent: UserDetailsComponent = fixture.debugElement.query(By.directive(UserDetailsComponent)).componentInstance;

    expect(detailsComponent.userDetails).toEqual(testUser);
  });



});
