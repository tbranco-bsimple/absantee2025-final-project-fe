import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { SprintApiService } from '../sprint-api.service';
import { SprintViewModel } from '../models/sprint-view.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { SprintFormService } from '../sprint-form/sprint-form.service';

@Component({
  selector: 'app-sprints',
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css'
})
export class SprintsComponent {

  sprints = signal<SprintViewModel[]>([]);
  private route = inject(ActivatedRoute);
  formService = inject(SprintFormService)
  apiService = inject(SprintApiService)

  @Input() projectId!: string;

  constructor() {

    const data = this.route.snapshot.data['sprints'] as SprintViewModel[];
    this.sprints.set(data);

    effect(() => {
      const sprintCreated = this.formService.sprintCreated();
      if (sprintCreated) {
        this.sprints.update(sprints => [...sprints, sprintCreated]);
      }
    }
    )
  }

  ngOnChanges(): void {
    if (this.projectId) {
      this.apiService.getSprintsByProjectId(this.projectId).subscribe({
        next: (sprints) => {
          this.sprints.set(sprints);
        },
        error: (err) => {
          console.error('Erro a carregar sprints:', err);
          this.sprints.set([]);
        }
      });;
    }
  }

  addSprint() {
    this.formService.startCreatingSprintForm();
  }

}
