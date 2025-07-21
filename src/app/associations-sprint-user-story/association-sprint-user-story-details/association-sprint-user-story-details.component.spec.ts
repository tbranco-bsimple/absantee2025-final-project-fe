import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationSprintUserStoryDetailsComponent } from './association-sprint-user-story-details.component';

describe('AssociationSprintUserStoryDetailsComponent', () => {
  let component: AssociationSprintUserStoryDetailsComponent;
  let fixture: ComponentFixture<AssociationSprintUserStoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationSprintUserStoryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationSprintUserStoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
