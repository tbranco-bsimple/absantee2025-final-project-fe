import { Component, computed } from '@angular/core';
import { Project } from '../model/project';
import { CommonModule } from '@angular/common';
import { ProjectStateService } from '../state/project-state.service';

@Component({
  selector: 'app-project-table',
  imports: [CommonModule],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css'
})
export class ProjectTableComponent {

  projects = computed(() => this.projectStateService.projects());

  constructor(private projectStateService: ProjectStateService) { }

  handleProjectSelected(project: Project) {
    this.projectStateService.setSelectedProject(project);
  }
}
