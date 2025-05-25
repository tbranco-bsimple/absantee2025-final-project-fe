import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AssociationProjCollabStateService } from '../state/association-proj-collab-state.service';
import { AssociationProjCollab } from '../model/association-proj-collab';

@Component({
  selector: 'app-association-proj-collab',
  imports: [CommonModule],
  templateUrl: './association-proj-collab.component.html',
  styleUrl: './association-proj-collab.component.css'
})
export class AssociationProjCollabComponent {

  associations = computed(() => this.associationStateService.associations());

  constructor(private associationStateService: AssociationProjCollabStateService) { }

  handleAssociationSelected(association: AssociationProjCollab) {
    this.associationStateService.setSelectedAssociation(association);
  }

}
