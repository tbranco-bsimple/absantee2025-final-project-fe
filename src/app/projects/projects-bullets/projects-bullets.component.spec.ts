import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProjectsBulletsComponent as ProjectsBulletsComponent } from './projects-bullets.component';

describe('ProjectsComponent', () => {
  let component: ProjectsBulletsComponent;
  let fixture: ComponentFixture<ProjectsBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsBulletsComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
