import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserStoryFormComponent } from './user-story-form.component';
import { UserStoryApiService } from '../user-story-api.service';
import { UserStoryFormService } from './user-story-form.service';
import { CreateUserStory } from '../models/create-user-story';
import { By } from '@angular/platform-browser';
import { UserStoryViewModel } from '../models/user-story-view.model';
import { ActivatedRoute } from '@angular/router';

describe('UserStoryFormComponent', () => {
  let component: UserStoryFormComponent;
  let fixture: ComponentFixture<UserStoryFormComponent>;
  let mockApiService: jasmine.SpyObj<UserStoryApiService>;
  let mockFormService: jasmine.SpyObj<UserStoryFormService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('UserStoryApiService', ['createUserStory']);
    mockFormService = jasmine.createSpyObj('UserStoryFormService', ['setUserStoryCreated', 'cancelCreatingUserStoryForm', 'isCreatingUserStoryForm']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserStoryFormComponent],
      providers: [
        { provide: UserStoryApiService, useValue: mockApiService },
        { provide: UserStoryFormService, useValue: mockFormService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {}, data: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserStoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with null values', () => {
    const formValue = component.form.value;
    expect(formValue.description).toBeNull();
    expect(formValue.priority).toBeNull();
    expect(formValue.risk).toBeNull();
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.form.patchValue({
      description: '',
      priority: null,
      risk: null
    });
    expect(component.form.valid).toBeFalse();
  });

  it('should call createUserStory and reset form if valid on submit', () => {
    const mockUserStory: CreateUserStory = {
      description: 'Test story',
      priority: 2,
      risk: 3
    };
    const mockUserStoryViewModel: UserStoryViewModel = {
      id: '1',
      description: 'Test',
      priorityLabel: 'Medium',
      riskLabel: 'High'
    };

    component.form.setValue(mockUserStory);
    mockApiService.createUserStory.and.returnValue(of({ ...mockUserStoryViewModel }));
    component.submitUserStory();

    expect(mockApiService.createUserStory).toHaveBeenCalledWith(mockUserStory);
    expect(mockFormService.setUserStoryCreated).toHaveBeenCalled();
    expect(mockFormService.cancelCreatingUserStoryForm).toHaveBeenCalled();
    expect(component.form.value.description).toBeNull();
  });

  it('should log error and not reset if submission fails', () => {
    const mockUserStory: CreateUserStory = {
      description: 'Error story',
      priority: 1,
      risk: 2
    };

    spyOn(console, 'error');
    component.form.setValue(mockUserStory);
    mockApiService.createUserStory.and.returnValue(throwError(() => new Error('API error')));
    component.submitUserStory();

    expect(console.error).toHaveBeenCalledWith('Error creating user story:', jasmine.any(Error));
    expect(mockFormService.setUserStoryCreated).not.toHaveBeenCalled();
  });

  it('should bind input values to the form controls', () => {
    const descriptionInput = fixture.debugElement.query(By.css('input[formControlName="description"]')).nativeElement;
    descriptionInput.value = 'Frontend work';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.get('description')?.value).toBe('Frontend work');
  });

  it('should reset form and cancel on onCancel()', () => {
    component.form.setValue({
      description: 'Cancel me',
      priority: 3,
      risk: 2
    });

    component.onCancel();

    expect(component.form.value.description).toBeNull();
    expect(mockFormService.cancelCreatingUserStoryForm).toHaveBeenCalled();
  });
});
