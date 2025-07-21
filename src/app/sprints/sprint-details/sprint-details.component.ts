import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SprintViewModel } from '../models/sprint-view.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sprint-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './sprint-details.component.html',
  styleUrl: './sprint-details.component.css'
})
export class SprintDetailsComponent {

  sprint: SprintViewModel | null = null;

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['sprint'];
      if (resolved) {
        this.sprint = resolved;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
