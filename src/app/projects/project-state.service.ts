import { Injectable, signal } from '@angular/core';
import { Project } from './project';
import { ProjectApiService } from './project-api.service';
import { CreateProject } from './create-project';

@Injectable({
    providedIn: 'root',
})
export class ProjectStateService {

    private _projects = signal<Project[]>([]);
    readonly projects = this._projects.asReadonly();

    private _projectDetails = signal<Project | null>(null);
    readonly projectDetails = this._projectDetails.asReadonly();

    constructor(private projectApiService: ProjectApiService) { }

    setSelectedProject(project: Project | null): void {
        this._projectDetails.set(project);
    }

    loadProjects(): void {
        this.projectApiService.getProjects().subscribe({
            next: (projects) => this._projects.set(projects),
            error: (err) => {
                console.error('Erro ao carregar projetos:', err);
            }
        });
    }

    addProject(newProject: CreateProject): void {
        this.projectApiService.addProject(newProject).subscribe({
            next: (newProj: Project) => {
                this._projects.update(list => [...list, newProj]);
            },
            error: (err) => console.error('Failed to add project:', err)
        });
    }

    updateProject(newCollaborator: Project): void {
        this.projectApiService.updateProject(newCollaborator).subscribe({
            next: (updatedProject) => {
                this._projects.update(list =>
                    list.map(project =>
                        project.id === updatedProject.id ? updatedProject : project
                    )
                );
            },
            error: (err) => console.error('Failed to update project:', err)
        });
    }
}
