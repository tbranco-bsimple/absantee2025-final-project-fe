import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssociationSprintUserStoryFormComponent } from '../association-sprint-user-story-form/association-sprint-user-story-form.component';
import { AssociationSprintUserStoryViewModel } from '../models/association-sprint-user-story-view.model';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { AssociationSprintUserStoryFormService } from '../association-sprint-user-story-form/association-sprint-user-story-form.service';

@Component({
  selector: 'app-associations-sprint-user-story',
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './associations-sprint-user-story.component.html',
  styleUrl: './associations-sprint-user-story.component.css'
})
export class AssociationsSprintUserStoryComponent {

  associationsSprintUserStory = signal<AssociationSprintUserStoryViewModel[]>([]);
  private route = inject(ActivatedRoute);
  formService = inject(AssociationSprintUserStoryFormService)

  constructor() {

    const data = this.route.snapshot.data['associationsSprintUserStories'] as AssociationSprintUserStoryViewModel[];
    this.associationsSprintUserStory.set(data);

    effect(() => {
      const associationSprintUserStoryCreated = this.formService.associationCreated();
      const associationSprintUserStoryEdited = this.formService.associationEdited();
      if (associationSprintUserStoryCreated) {
        this.associationsSprintUserStory.update(associations => [...associations, associationSprintUserStoryCreated]);
      }
      if (associationSprintUserStoryEdited) {
        this.associationsSprintUserStory.update(associations =>
          associations.map(a => a.id === associationSprintUserStoryEdited.id ? associationSprintUserStoryEdited : a)
        );
      }
    }
    )
  }

  addAssociationSprintUserStory() {
    this.formService.startCreatingAssociationForm();
  }

}
