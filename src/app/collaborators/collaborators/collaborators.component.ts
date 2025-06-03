import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CollaboratorStateService } from '../collaborator-state.service';
import { AssociationProjCollabComponent } from '../../associations/association-proj-collab/association-proj-collab.component';
import { HolidayPeriodComponent } from '../../holidays/holiday-period/holiday-period.component';
import { HolidayPeriodDetailsComponent } from "../../holidays/holiday-period-details/holiday-period-details.component";
import { AssociationProjCollabDetailsComponent } from '../../associations/association-proj-collab-details/association-proj-collab-details.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateCollaborator } from '../create-collaborator';

@Component({
  selector: 'app-collaborators',
  imports: [CommonModule, ReactiveFormsModule, AssociationProjCollabComponent, AssociationProjCollabDetailsComponent, HolidayPeriodComponent, HolidayPeriodDetailsComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {

  collaborators = computed(() => this.collaboratorStateService.collaborators());
  selectedAssociationsCollaboratorId: string | null = null;
  selectedHolidaysCollaboratorId: string | null = null;
  showButtons = false;

  form = new FormGroup({
    collaborators: new FormArray<FormGroup<{ names: FormControl<string>, surnames: FormControl<string>, email: FormControl<string>, deactivationDate: FormControl<string>, _initDate: FormControl<string>, _finalDate: FormControl<string> }>>([])
  })

  constructor(private collaboratorStateService: CollaboratorStateService) { }

  get collaboratorsForm(): FormArray<FormGroup<{ names: FormControl<string>, surnames: FormControl<string>, email: FormControl<string>, deactivationDate: FormControl<string>, _initDate: FormControl<string>, _finalDate: FormControl<string> }>> {
    return this.form.get('collaborators') as FormArray;
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  handleCollaboratorSelected(collaborator: Collaborator): void {
    this.collaboratorStateService.setSelectedCollaborator(collaborator);
    this.selectedAssociationsCollaboratorId = null;
    this.selectedHolidaysCollaboratorId = null;
    this.collaboratorsForm.clear();
    this.showButtons = false;
  }

  openAssociations(collaboratorId: string) {
    this.selectedAssociationsCollaboratorId = collaboratorId;
    this.selectedHolidaysCollaboratorId = null;
    this.collaboratorStateService.setSelectedCollaborator(null);
    this.collaboratorsForm.clear();
    this.showButtons = false;

  }

  openHolidays(collaboratorId: string) {
    this.selectedHolidaysCollaboratorId = collaboratorId;
    this.selectedAssociationsCollaboratorId = null;
    this.collaboratorStateService.setSelectedCollaborator(null);
    this.collaboratorsForm.clear();
    this.showButtons = false;
  }

  createEmptyCollaborator() {
    this.showButtons = true;
    this.selectedHolidaysCollaboratorId = null;
    this.selectedAssociationsCollaboratorId = null;
    this.collaboratorStateService.setSelectedCollaborator(null);
    this.collaboratorsForm.push(
      new FormGroup({
        names: new FormControl(''),
        surnames: new FormControl(''),
        email: new FormControl(''),
        deactivationDate: new FormControl(this.formatDate(new Date().toDateString())),
        _initDate: new FormControl(this.formatDate(new Date().toDateString())),
        _finalDate: new FormControl(this.formatDate(new Date().toDateString()))
      }) as FormGroup<{ names: FormControl<string>, surnames: FormControl<string>, email: FormControl<string>, deactivationDate: FormControl<string>, _initDate: FormControl<string>, _finalDate: FormControl<string> }>
    );
  }

  submitNewCollaborator() {
    const lastGroup = this.collaboratorsForm.at(this.collaboratorsForm.length - 1);

    const names = lastGroup.get('names')?.value;
    const surnames = lastGroup.get('surnames')?.value;
    const email = lastGroup.get('email')?.value;
    const deactivationDate = lastGroup.get('deactivationDate')?.value;
    const _initDate = lastGroup.get('_initDate')?.value;
    const _finalDate = lastGroup.get('_finalDate')?.value;

    console.log('Submitting new collaborator:', names, surnames, email, deactivationDate, _initDate, _finalDate);
    if (!names || !surnames || !email || !deactivationDate || !_initDate || !_finalDate) return;

    const toIsoDateTime = (dateStr: string) => new Date(dateStr).toISOString();

    const collaborator: CreateCollaborator = {
      names,
      surnames,
      email,
      deactivationDate: toIsoDateTime(deactivationDate),
      periodDateTime: {
        _initDate: toIsoDateTime(_initDate),
        _finalDate: toIsoDateTime(_finalDate)
      }
    };

    this.collaboratorStateService.addCollaborator(collaborator);
    /* this.collaboratorsForm.clear(); */
  }

  onCancel() {
    this.collaboratorsForm.clear();
    this.showButtons = false;
  }

}
