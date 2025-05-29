import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';

describe('UserDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
