import { Injectable, signal } from '@angular/core';
import { Project } from '../model/project';
import { ProjectApiService } from '../service-api/project-api.service';
import { ProjectService } from '../service/project.service';
import { AssociationProjCollab } from '../model/association-proj-collab';

@Injectable({
    providedIn: 'root',
})
export class ProjectStateService {

    private _projects = signal<Project[]>([]);
    readonly projects = this._projects.asReadonly();

    private _projectDetails = signal<Project | null>(null);
    readonly projectDetails = this._projectDetails.asReadonly();

    constructor(private projectApiService: ProjectApiService) { }

    loadProjects(): void {
        this.projectApiService.getProjects().subscribe({
            next: (projects) => this._projects.set(projects),
            error: (err) => {
                console.error('Erro ao carregar projetos:', err);
            }
        });
    }

    setSelectedProject(project: Project | null): void {
        this._projectDetails.set(project);
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
