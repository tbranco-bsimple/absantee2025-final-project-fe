import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationProjCollabComponent } from './association-proj-collab.component';

describe('AssociationProjCollabComponent', () => {
  let component: AssociationProjCollabComponent;
  let fixture: ComponentFixture<AssociationProjCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationProjCollabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationProjCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
