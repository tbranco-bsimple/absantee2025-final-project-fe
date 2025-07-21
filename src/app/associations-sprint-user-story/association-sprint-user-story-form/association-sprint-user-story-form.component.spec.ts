import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationSprintUserStoryFormComponent } from './association-sprint-user-story-form.component';

describe('AssociationSprintUserStoryFormComponent', () => {
  let component: AssociationSprintUserStoryFormComponent;
  let fixture: ComponentFixture<AssociationSprintUserStoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationSprintUserStoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationSprintUserStoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
