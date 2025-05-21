import { Injectable, signal } from '@angular/core';
import { Project } from '../model/project';
import { ProjectApiService } from '../api/project-api.service';

@Injectable({
    providedIn: 'root',
})
export class ProjectStateService {

    private _projects = signal<Project[]>([]);
    readonly projects = this._projects.asReadonly();

    private _projectDetails = signal<Project | null>(null);
    readonly projectDetails = this._projectDetails.asReadonly();

    private _updatedProject = signal<Project | null>(null);
    readonly updatedProject = this._updatedProject.asReadonly();

    constructor(private projectApiService: ProjectApiService) { }

    loadProjects(): void {
        this.projectApiService.getProjects().subscribe({
            next: (projects) => this._projects.set(projects),
            error: (err) => console.error('Erro ao carregar projetos:', err)
        });
    }

    getProjectsSignal() {
        return this._projects();
    }

    getProjectDetailsSignal() {
        return this._projectDetails();
    }

    setSelectedProject(project: Project) {
        this._projectDetails.set(project);
    }

    emitProjectUpdated(project: Project): void {
        this._updatedProject.set(project);
    }

    clearUpdatedProject(): void {
        this._updatedProject.set(null);
    }

    updateProject(newProject: Project): void {
        this._projects.update(list =>
            list.map(p => p.id === newProject.id ? { ...newProject } : p)
        );
        if (this._projectDetails()?.id === newProject.id) {
            this._projectDetails.set({ ...newProject });
        }
    }
}
