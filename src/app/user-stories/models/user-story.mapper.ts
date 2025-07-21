import { UserStory } from './user-story';
import { UserStoryViewModel } from './user-story-view.model';
import { Priority } from './priority.enum';
import { Risk } from './risk.enum';

export class UserStoryMapper {
    static toViewModel(userStory: UserStory): UserStoryViewModel {
        return {
            id: userStory.id,
            description: userStory.description,
            priorityLabel: UserStoryMapper.mapPriorityToLabel(userStory.priority),
            riskLabel: UserStoryMapper.mapRiskToLabel(userStory.risk)
        };
    }

    static fromViewModel(vm: UserStoryViewModel): UserStory {
        return {
            id: vm.id,
            description: vm.description,
            priority: UserStoryMapper.mapLabelToPriority(vm.priorityLabel),
            risk: UserStoryMapper.mapLabelToRisk(vm.riskLabel)
        };
    }

    static mapPriorityToLabel(priority: Priority): string {
        switch (priority) {
            case Priority.Low: return 'Low';
            case Priority.Medium: return 'Medium';
            case Priority.High: return 'High';
            case Priority.Critical: return 'Critical';
            default: return 'Unknown';
        }
    }

    static mapRiskToLabel(risk: Risk): string {
        switch (risk) {
            case Risk.Low: return 'Low';
            case Risk.Medium: return 'Medium';
            case Risk.High: return 'High';
            case Risk.Critical: return 'Critical';
            default: return 'Unknown';
        }
    }

    static mapLabelToPriority(label: string): Priority {
        switch (label) {
            case 'Low': return Priority.Low;
            case 'Medium': return Priority.Medium;
            case 'High': return Priority.High;
            case 'Critical': return Priority.Critical;
            default: throw new Error(`Invalid priority label: ${label}`);
        }
    }

    static mapLabelToRisk(label: string): Risk {
        switch (label) {
            case 'Low': return Risk.Low;
            case 'Medium': return Risk.Medium;
            case 'High': return Risk.High;
            case 'Critical': return Risk.Critical;
            default: throw new Error(`Invalid risk label: ${label}`);
        }
    }
}
