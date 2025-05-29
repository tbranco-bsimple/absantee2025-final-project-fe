import { Component, computed, effect, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssociationProjCollab } from '../model/association-proj-collab';
import { CollaboratorStateService } from '../state/collaborator-state.service';

@Component({
  selector: 'app-association-proj-collab-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './association-proj-collab-details.component.html',
  styleUrl: './association-proj-collab-details.component.css'
})
export class AssociationProjCollabDetailsComponent implements OnDestroy {

  associationDetails = computed(() => this.collaboratorStateService.collaboratorAssociationDetails());

  isEditing = false;
  localAssociation: AssociationProjCollab | null = null;

  @Input() collaboratorId!: string

  constructor(private collaboratorStateService: CollaboratorStateService) {
    effect(() => {
      const association = this.associationDetails();
      this.isEditing = false;
      this.localAssociation = association ? structuredClone(association) : null;
    });
  }

  ngOnDestroy() {
    this.collaboratorStateService.setSelectedAssociation(null);
  }

  edit() {
    this.isEditing = true;
    this.localAssociation = this.associationDetails() ? structuredClone(this.associationDetails()) : null;
  }

  onEdit() {
    if (this.localAssociation) {
      this.collaboratorStateService.updateAssociation(this.localAssociation);
      this.collaboratorStateService.setSelectedAssociation(null);
      this.isEditing = false;
    }
  }
  onCancel() {
    this.isEditing = false;
  }
}
