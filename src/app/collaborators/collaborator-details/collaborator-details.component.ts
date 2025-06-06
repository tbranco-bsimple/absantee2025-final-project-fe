import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Collaborator } from '../collaborator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collaborator-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent implements OnInit, OnDestroy {
  collaborator: Collaborator | null = null;
  localCollaborator: Collaborator | null = null;
  isEditing = false;

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['collaborator'];
      if (resolved) {
        this.collaborator = resolved;
        this.isEditing = false;
        this.localCollaborator = structuredClone(resolved);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  edit() {
    this.isEditing = true;
    this.localCollaborator = this.collaborator ? structuredClone(this.collaborator) : null;
  }

  onEdit() {
    if (this.localCollaborator) {
      this.collaborator = structuredClone(this.localCollaborator);
      this.isEditing = false;
    }
  }

  onCancel() {
    this.isEditing = false;
    this.localCollaborator = this.collaborator ? structuredClone(this.collaborator) : null;
  }

}
