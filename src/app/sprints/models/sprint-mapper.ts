import { Sprint } from './sprint';
import { SprintViewModel } from './sprint-view.model';

export class SprintMapper {
    static toViewModel(sprint: Sprint): SprintViewModel {
        return {
            id: sprint.id,
            projectId: sprint.projectId,
            initDate: sprint.period.initDate,
            finalDate: sprint.period.finalDate,
            totalEffortHours: sprint.totalEffortHours
        };
    }

    static fromViewModel(vm: SprintViewModel): Sprint {
        return {
            id: vm.id,
            projectId: vm.projectId,
            period: {
                initDate: vm.initDate,
                finalDate: vm.finalDate
            },
            totalEffortHours: vm.totalEffortHours
        };
    }
}
