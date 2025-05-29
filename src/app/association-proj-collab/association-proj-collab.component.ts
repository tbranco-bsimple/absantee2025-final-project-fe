import { CommonModule } from '@angular/common';
import { Component, computed, Input, effect, OnChanges } from '@angular/core';
import { AssociationProjCollab } from '../model/association-proj-collab';
import { CollaboratorStateService } from '../state/collaborator-state.service';

@Component({
  selector: 'app-association-proj-collab',
  imports: [CommonModule],
  templateUrl: './association-proj-collab.component.html',
  styleUrl: './association-proj-collab.component.css'
})
export class AssociationProjCollabComponent implements OnChanges {

  associations = computed(() => this.collaboratorStateService.collaboratorAssociations());

  @Input() collaboratorId!: string;

  constructor(private collaboratorStateService: CollaboratorStateService) {
    effect(() => {
      if (this.collaboratorId) {
        this.collaboratorStateService.loadCollaboratorAssociations(this.collaboratorId);
      }
    });
  }

  ngOnChanges() {
    if (this.collaboratorId) {
      this.collaboratorStateService.loadCollaboratorAssociations(this.collaboratorId);
    }
  }

  handleAssociationSelected(association: AssociationProjCollab) {
    this.collaboratorStateService.setSelectedAssociation(association);
  }

}
