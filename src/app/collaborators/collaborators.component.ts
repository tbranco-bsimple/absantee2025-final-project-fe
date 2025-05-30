import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { Collaborator } from '../model/collaborator';
import { CollaboratorStateService } from '../state/collaborator-state.service';
import { AssociationProjCollabComponent } from '../association-proj-collab/association-proj-collab.component';
import { HolidayPeriodComponent } from '../holiday-period/holiday-period.component';
import { HolidayPeriodDetailsComponent } from "../holiday-period-details/holiday-period-details.component";
import { AssociationProjCollabDetailsComponent } from '../association-proj-collab-details/association-proj-collab-details.component';

@Component({
  selector: 'app-collaborators',
  imports: [CommonModule, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent, HolidayPeriodComponent, HolidayPeriodDetailsComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {

  collaborators = computed(() => this.collaboratorStateService.collaborators());
  selectedAssociationsCollaboratorId: string | null = null;
  selectedHolidaysCollaboratorId: string | null = null;

  constructor(private collaboratorStateService: CollaboratorStateService) { }

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
