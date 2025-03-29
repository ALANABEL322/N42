import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/types/project';

interface ProjectDetailsState {
  projectDetails: Project | null;
  setProjectDetails: (project: Project) => void;
  clearProjectDetails: () => void;
}

export const useProjectDetailsStore = create<ProjectDetailsState>()(
  persist(
    (set) => ({
      projectDetails: null,
      setProjectDetails: (project) => set({ projectDetails: project }),
      clearProjectDetails: () => set({ projectDetails: null }),
    }),
    {
      name: 'project-details-storage',
    }
  )
);
