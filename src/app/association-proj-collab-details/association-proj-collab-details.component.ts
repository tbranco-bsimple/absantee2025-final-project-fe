import { Component, computed, effect, Input, OnDestroy } from '@angular/core';
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
export class AssociationProjCollabDetailsComponent implements OnDestroy {

  associationDetails = computed(() => this.associationProjCollabStateService.associationDetails());

  isEditing = false;
  localAssociation: AssociationProjCollab | null = null;

  @Input() collaboratorId!: string
  @Input() projectId!: string;

  constructor(private associationProjCollabStateService: AssociationProjCollabStateService) {
    effect(() => {
      const association = this.associationDetails();
      this.isEditing = false;
      this.localAssociation = association ? structuredClone(association) : null;
    });
  }

  ngOnDestroy() {
    this.associationProjCollabStateService.setSelectedAssociation(null);
  }

  edit() {
    this.isEditing = true;
    this.localAssociation = this.associationDetails() ? structuredClone(this.associationDetails()) : null;
  }

  onEdit() {
    if (this.localAssociation) {
      this.associationProjCollabStateService.updateAssociation(this.localAssociation);
      this.associationProjCollabStateService.setSelectedAssociation(null);
      this.isEditing = false;
    }
  }
  onCancel() {
    this.isEditing = false;
  }
}
