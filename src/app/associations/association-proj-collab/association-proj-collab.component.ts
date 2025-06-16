import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnChanges } from '@angular/core';
import { AssociationProjCollab } from '../association-proj-collab';
import { AssociationProjCollabStateService } from '../association-proj-collab-state.service';


@Component({
  selector: 'app-association-proj-collab',
  imports: [CommonModule],
  templateUrl: './association-proj-collab.component.html',
  styleUrl: './association-proj-collab.component.css'
})
export class AssociationProjCollabComponent implements OnChanges {

  associations = computed(() => this.associationProjCollabStateService.associations());

  @Input() collaboratorId!: string;
  @Input() projectId!: string;

  constructor(private associationProjCollabStateService: AssociationProjCollabStateService) {
  }

  ngOnChanges() {
    if (this.collaboratorId) {
      this.associationProjCollabStateService.loadCollaboratorAssociations(this.collaboratorId);
    }
    if (this.projectId) {
      this.associationProjCollabStateService.loadProjectAssociations(this.projectId);
    }
  }

}
