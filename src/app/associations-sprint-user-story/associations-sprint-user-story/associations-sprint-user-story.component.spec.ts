import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsSprintUserStoryComponent } from './associations-sprint-user-story.component';

describe('AssociationsSprintUserStoryComponent', () => {
  let component: AssociationsSprintUserStoryComponent;
  let fixture: ComponentFixture<AssociationsSprintUserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationsSprintUserStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsSprintUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
