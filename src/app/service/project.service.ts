import { Injectable } from '@angular/core';
import { Project } from '../model/project';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {

    projects: Project[] = [
        {
            "id": "51593fc9-91b3-4ad5-a4c7-213df7b3fe48",
            "title": "Exemplo de Título",
            "acronym": "3P8",
            "periodDate": {
                "initDate": "2025-01-01",
                "finalDate": "2025-06-30"
            }
        },
        {
            "id": "eccf5555-10bd-4ff3-b88d-de101db92cb0",
            "title": "Titulo 2",
            "acronym": "XTF",
            "periodDate": {
                "initDate": "2025-01-01",
                "finalDate": "2025-12-31"
            }
        },
        {
            "id": "a8b349d0-86c1-4158-ad6a-7d30b18b2f53",
            "title": "Titulo 3",
            "acronym": "CGH",
            "periodDate": {
                "initDate": "2025-07-01",
                "finalDate": "2026-02-21"
            }
        },
        {
            "id": "35d6b2a2-2375-4cc3-9181-c86c6310a9cb",
            "title": "Titulo 4",
            "acronym": "M5J",
            "periodDate": {
                "initDate": "2025-07-01",
                "finalDate": "2028-12-01"
            }
        },
        {
            "id": "4dfdae9c-8ca4-4b72-a847-603a8f94c965",
            "title": "Titulo 5 ",
            "acronym": "9QW",
            "periodDate": {
                "initDate": "2025-07-01",
                "finalDate": "2026-02-25"
            }
        },
        {
            "id": "4f6fa361-e99d-44f6-9ce7-cab6b8189b28",
            "title": "Titulo 6",
            "acronym": "9O0",
            "periodDate": {
                "initDate": "2025-07-01",
                "finalDate": "2028-12-31"
            }
        },
        {
            "id": "3d74d97f-a40b-4d56-a862-65d2fe689dd4",
            "title": "Titulo 7",
            "acronym": "RH5",
            "periodDate": {
                "initDate": "2025-07-01",
                "finalDate": "2029-10-21"
            }
        }
    ]

    getProjects(): Project[] {
        return this.projects;
    }

    getProjectById(id: string): Project {
        const project = this.projects.find(project => project.id === id);
        if (!project) {
            throw new Error(`Project with id ${id} not found`);
        }
        return project;
    }
}
