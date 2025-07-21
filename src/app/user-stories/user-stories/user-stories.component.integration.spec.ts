import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '../../app.routes';

import { UserStoriesComponent } from './user-stories.component';
import { UserStoryDetailsComponent } from '../user-story-details/user-story-details.component';
import { UserStoryFormComponent } from '../user-story-form/user-story-form.component';
import { AppComponent } from '../../app.component';

describe('UserStoriesComponentIntegration', () => {
  let router: Router;
  let location: Location;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        UserStoriesComponent,
        UserStoryDetailsComponent,
        UserStoryFormComponent
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should navigate to user story detail on row click', fakeAsync(() => {
    fixture.detectChanges();
    router.navigate(['/user-stories']);
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const row = compiled.querySelector('tbody tr');
    row.click();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/user-stories/1');
  }));

  it('should navigate to add user story on button click', fakeAsync(() => {
    fixture.detectChanges();
    router.navigate(['/user-stories']);
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('.add-user-story-button');
    addButton.click();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/user-stories/add');
  }));
});
