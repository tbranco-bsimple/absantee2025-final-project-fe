import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserStoryViewModel } from '../models/user-story-view.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-story-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-story-details.component.html',
  styleUrl: './user-story-details.component.css'
})
export class UserStoryDetailsComponent implements OnInit, OnDestroy {

  userStory: UserStoryViewModel | null = null;

  private route = inject(ActivatedRoute);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      const resolved = data['userStory'];
      if (resolved) {
        this.userStory = resolved;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
