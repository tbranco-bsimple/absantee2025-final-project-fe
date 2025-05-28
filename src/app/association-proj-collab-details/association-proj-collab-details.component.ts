import { Component, computed, effect, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssociationProjCollab } from '../model/association-proj-collab';
import { AssociationProjCollabStateService } from '../state/association-proj-collab-state.service';

@Component({
  selector: 'app-association-proj-collab-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './association-proj-collab-details.component.html',
  styleUrl: './association-proj-collab-details.component.css'
})
export class AssociationProjCollabDetailsComponent implements OnChanges, OnDestroy {

  associationDetails = computed(() => this.associationStateService.associationDetails());

  isEditing = false;
  localAssociation: AssociationProjCollab | null = null;

  @Input() collaboratorId!: string;


  constructor(private associationStateService: AssociationProjCollabStateService) {
    effect(() => {
      if (this.collaboratorId) {
        this.associationStateService.loadAssociationsForCollaborator(this.collaboratorId)
      }
      const association = this.associationDetails();
      this.isEditing = false;
      this.localAssociation = association ? structuredClone(association) : null;
    });
  }

  ngOnChanges() {
    if (this.collaboratorId) {
      this.associationStateService.loadAssociationsForCollaborator(this.collaboratorId);
    }
  }

  ngOnDestroy() {
    this.associationStateService.setSelectedAssociation(null);
  }

  edit() {
    this.isEditing = true;
    this.localAssociation = this.associationDetails() ? structuredClone(this.associationDetails()) : null;
  }

  onEdit() {
    if (this.localAssociation) {
      this.associationStateService.updateAssociation(this.localAssociation);
      this.associationStateService.setSelectedAssociation(null);
      this.isEditing = false;
    }
  }
}
