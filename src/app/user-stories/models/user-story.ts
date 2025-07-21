import { Priority } from './priority.enum';
import { Risk } from './risk.enum';

export interface UserStory {
    id: string;
    description: string;
    priority: Priority;
    risk: Risk;
}