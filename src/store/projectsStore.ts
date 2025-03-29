import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '../types/project';

interface ProjectsState {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  getProjects: () => Project[];
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project: Project) =>
        set({
          projects: [...get().projects, { ...project, id: Date.now().toString() }],
        }),
      removeProject: (projectId: string) =>
        set({
          projects: get().projects.filter((project) => project.id !== projectId),
        }),
      getProjects: () => get().projects,
    }),
    {
      name: 'projects-storage',
    }
  )
);
