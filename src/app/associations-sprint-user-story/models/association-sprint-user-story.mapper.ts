import { AssociationSprintUserStory } from './association-sprint-user-story';
import { AssociationSprintUserStoryViewModel } from './association-sprint-user-story-view.model';

export class AssociationSprintUserStoryMapper {
    static toViewModel(associationSprintUserStory: AssociationSprintUserStory): AssociationSprintUserStoryViewModel {
        return {
            id: associationSprintUserStory.id,
            sprintId: associationSprintUserStory.sprintId,
            userStoryId: associationSprintUserStory.userStoryId,
            collaboratorId: associationSprintUserStory.collaboratorId,
            effortHours: associationSprintUserStory.effortHours,
            completionPercentage: associationSprintUserStory.completionPercentage,
        };
    }

    static fromViewModel(vm: AssociationSprintUserStoryViewModel): AssociationSprintUserStory {
        return {
            id: vm.id,
            sprintId: vm.sprintId,
            userStoryId: vm.userStoryId,
            collaboratorId: vm.collaboratorId,
            effortHours: vm.effortHours,
            completionPercentage: vm.completionPercentage,
        };
    }
}
