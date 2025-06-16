import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Collaborator } from '../collaborator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollaboratorFormService } from '../collaborator-form/collaborator-form.service';

@Component({
  selector: 'app-collaborator-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent implements OnInit, OnDestroy {

  collaborator: Collaborator | null = null;

  formService = inject(CollaboratorFormService);

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['collaborator'];
      if (resolved) {
        this.collaborator = resolved;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  editCollaborator(collaborator: Collaborator) {
    this.formService.startEditingCollaboratorForm(collaborator);
  }
}
