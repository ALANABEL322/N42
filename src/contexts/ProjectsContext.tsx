import { createContext, useContext, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  brandName: string;
  slogan: string;
  colorPalette: {
    cian: string;
    magenta: string;
    amarillo: string;
    negro: string;
  };
  typography: {
    name: string;
    fontFamily: string;
    googleFontLink: string;
    weights: string[];
    sampleText: string;
  };
  mockupImage: string;
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now().toString() }]);
  };

  const removeProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects debe ser usado dentro de un ProjectsProvider');
  }
  return context;
}
