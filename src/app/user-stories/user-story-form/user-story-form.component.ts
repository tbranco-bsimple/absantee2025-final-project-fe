import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserStoryApiService } from '../user-story-api.service';
import { UserStoryForm } from '../models/user-story-form.model';
import { Priority } from '../models/priority.enum';
import { Risk } from '../models/risk.enum';
import { UserStoryFormService } from './user-story-form.service';
import { CreateUserStory } from '../models/create-user-story';

@Component({
  selector: 'app-user-story-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-story-form.component.html',
  styleUrls: ['./user-story-form.component.css']
})
export class UserStoryFormComponent {

  private apiService = inject(UserStoryApiService);
  private formService = inject(UserStoryFormService);

  form: FormGroup<UserStoryForm>;

  constructor() {
    this.form = new FormGroup<UserStoryForm>({
      description: new FormControl<string | null>(null, Validators.required),
      priority: new FormControl<Priority | null>(null, Validators.required),
      risk: new FormControl<Risk | null>(null, Validators.required)
    });

    effect(() => {
      if (this.formService.isCreatingUserStoryForm()) {
        this.form.reset();
      }
    });
  }

  submitUserStory() {
    if (this.form.valid) {
      const rawValue = this.form.value;

      const newUserStory: CreateUserStory = {
        description: rawValue.description ?? '',
        priority: rawValue.priority!,
        risk: rawValue.risk!
      };

      this.apiService.createUserStory(newUserStory).subscribe({
        next: (created) => {
          console.log('User story created:', created);
          this.formService.setUserStoryCreated(created);
          this.formService.cancelCreatingUserStoryForm();
          this.form.reset();
        },
        error: (err) => console.error('Error creating user story:', err)
      });
    }
  }

  onCancel() {
    this.form.reset();
    this.formService.cancelCreatingUserStoryForm();
  }
}
