import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CollaboratorStateService } from '../collaborator-state.service';
import { AssociationProjCollabComponent } from '../../associations/association-proj-collab/association-proj-collab.component';
import { HolidayPeriodComponent } from '../../holidays/holiday-period/holiday-period.component';
import { HolidayPeriodDetailsComponent } from "../../holidays/holiday-period-details/holiday-period-details.component";
import { AssociationProjCollabDetailsComponent } from '../../associations/association-proj-collab-details/association-proj-collab-details.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collaborators',
  imports: [CommonModule, RouterModule, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent, HolidayPeriodComponent, HolidayPeriodDetailsComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {

  collaborators = computed(() => this.collaboratorStateService.collaborators());
  collaboratorDetails = computed(() => this.collaboratorStateService.collaboratorDetails());
  selectedAssociationsCollaboratorId: string | null = null;
  selectedHolidaysCollaboratorId: string | null = null;

  constructor(private collaboratorStateService: CollaboratorStateService) {
    this.collaboratorStateService.loadCollaborators();
  }

  handleCollaboratorSelected(collaborator: Collaborator): void {
    this.collaboratorStateService.setSelectedCollaborator(collaborator);
    this.selectedAssociationsCollaboratorId = null;
    this.selectedHolidaysCollaboratorId = null;
  }

  openAssociations(collaboratorId: string) {
    this.selectedAssociationsCollaboratorId = collaboratorId;
    this.selectedHolidaysCollaboratorId = null;
    this.collaboratorStateService.setSelectedCollaborator(null);

  }

  openHolidays(collaboratorId: string) {
    this.selectedHolidaysCollaboratorId = collaboratorId;
    this.selectedAssociationsCollaboratorId = null;
    this.collaboratorStateService.setSelectedCollaborator(null);
  }

}
