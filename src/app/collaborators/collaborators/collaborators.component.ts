import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { Collaborator } from '../collaborator';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { Subscription } from 'rxjs';
import { CollaboratorFormService } from '../collaborator-form/collaborator-form.service';
import { CollaboratorApiService } from '../collaborator-api.service';

@Component({
  selector: 'app-collaborators',
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent implements OnDestroy {

  collaborators = signal<Collaborator[]>([]);

  apiService = inject(CollaboratorApiService)
  formService = inject(CollaboratorFormService)

  private subscription: Subscription | null = null;

  constructor() {
    this.subscription = this.apiService.getCollaborators().subscribe(collabs => {
      this.collaborators.set(collabs);
    });

    effect(() => {

      const collaboratorCreated = this.formService.collaboratorCreated();
      const collaboratorEdited = this.formService.collaboratorEdited();

      if (collaboratorCreated) {
        this.collaborators.update(collaborators => [...collaborators, collaboratorCreated]);
      }
      if (collaboratorEdited) {
        this.collaborators.update(collaborators =>
          collaborators.map(c => c.collabId === collaboratorEdited.collabId ? collaboratorEdited : c)
        );
      }
    }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addCollaborator() {
    this.formService.startCreatingCollaboratorForm();
  }

}
