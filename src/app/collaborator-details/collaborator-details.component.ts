import { Component, OnDestroy, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Collaborator } from '../model/collaborator';
import { CollaboratorStateService } from '../state/collaborator-state.service';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})

export class CollaboratorDetailsComponent implements OnDestroy {

  collaboratorDetails = computed(() => this.collaboratorStateService.collaboratorDetails());

  isEditing = false;
  localCollaborator: Collaborator | null = null;

  constructor(private collaboratorStateService: CollaboratorStateService) {
    effect(() => {
      const collaborator = this.collaboratorDetails();
      this.isEditing = false;
      this.localCollaborator = collaborator ? structuredClone(collaborator) : null;
    });
  }

  ngOnChanges(): void {
    this.isEditing = false;
  }

  ngOnDestroy(): void {
    this.collaboratorStateService.setSelectedCollaborator(null);
  }

  edit() {
    this.isEditing = true;
    this.localCollaborator = this.collaboratorDetails() ? structuredClone(this.collaboratorDetails()) : null;
  }

  onEdit() {
    if (this.localCollaborator) {
      this.collaboratorStateService.updateCollaborator(this.localCollaborator);
      this.collaboratorStateService.setSelectedCollaborator(null);
      this.isEditing = false;
    }
  }
  onCancel() {
    this.isEditing = false;
  }
}

