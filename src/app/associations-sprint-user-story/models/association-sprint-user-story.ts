
export interface AssociationSprintUserStory {
    id: string;
    sprintId: string;
    userStoryId: string;
    collaboratorId: string;
    effortHours: number;
    completionPercentage: number;
}