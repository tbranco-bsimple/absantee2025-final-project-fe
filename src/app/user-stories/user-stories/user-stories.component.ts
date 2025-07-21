import { Component, effect, inject, signal } from '@angular/core';
import { UserStoryViewModel } from '../models/user-story-view.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { UserStoryFormService } from '../user-story-form/user-story-form.service';

@Component({
  selector: 'app-user-stories',
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './user-stories.component.html',
  styleUrl: './user-stories.component.css'
})
export class UserStoriesComponent {

  userStories = signal<UserStoryViewModel[]>([]);
  private route = inject(ActivatedRoute);
  formService = inject(UserStoryFormService)

  constructor() {

    const data = this.route.snapshot.data['userStories'] as UserStoryViewModel[];
    this.userStories.set(data);

    effect(() => {
      const userStoryCreated = this.formService.userStoryCreated();
      if (userStoryCreated) {
        this.userStories.update(userStories => [...userStories, userStoryCreated]);
      }
    }
    )
  }

  addUserStory() {
    this.formService.startCreatingUserStoryForm();
  }

}
