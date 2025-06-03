import { Component, computed } from '@angular/core';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../project-state.service';

@Component({
  selector: 'app-projects-bullets',
  imports: [CommonModule],
  templateUrl: './projects-bullets.component.html',
  styleUrl: './projects-bullets.component.css'
})
export class ProjectsBulletsComponent {

  projects = computed(() => this.projectStateService.projects());

  constructor(private projectStateService: ProjectStateService) { }

  handleProjectSelected(project: Project) {
    this.projectStateService.setSelectedProject(project);
  }
}
