import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationProjCollabDetailsComponent } from './association-proj-collab-details.component';

describe('AssociationProjCollabDetailsComponent', () => {
  let component: AssociationProjCollabDetailsComponent;
  let fixture: ComponentFixture<AssociationProjCollabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationProjCollabDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationProjCollabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
