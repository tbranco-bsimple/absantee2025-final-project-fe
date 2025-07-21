import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssociationSprintUserStoryViewModel } from '../models/association-sprint-user-story-view.model';
import { Subscription } from 'rxjs';
import { AssociationSprintUserStoryFormService } from '../association-sprint-user-story-form/association-sprint-user-story-form.service';

@Component({
  selector: 'app-association-sprint-user-story-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './association-sprint-user-story-details.component.html',
  styleUrl: './association-sprint-user-story-details.component.css'
})
export class AssociationSprintUserStoryDetailsComponent {

  associationSprintUserStory: AssociationSprintUserStoryViewModel | null = null;

  formService = inject(AssociationSprintUserStoryFormService);

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['associationSprintUserStory'];
      if (resolved) {
        this.associationSprintUserStory = resolved;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  editAssociation(association: AssociationSprintUserStoryViewModel) {
    this.formService.startEditingAssociationForm(association);
  }
}
