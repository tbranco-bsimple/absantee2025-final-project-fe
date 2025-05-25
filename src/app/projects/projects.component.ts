import { Component, computed } from '@angular/core';
import { Project } from '../model/project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../state/project-state.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects = computed(() => this.projectStateService.projects());

  constructor(private projectStateService: ProjectStateService) { }

  handleProjectSelected(project: Project) {
    this.projectStateService.setSelectedProject(project);
  }
}
