import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCreateProject } from "~/hooks/useCreateProject";
import { Project } from "@prisma/client";

interface ProjectContextType {
    projects: Project[];
    handleCreateProject: (projectFormData: ProjectFormData) => void;
    currentProject: Project | null;
    openProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const projectState = useCreateProject();
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    const openProject = (project: Project) => {
      setCurrentProject(project);
    };

    return (
      <ProjectContext.Provider
        value={{
          ...projectState,
          currentProject,
          openProject,
        }}
      >
        {children}
      </ProjectContext.Provider>
    );
};

export const useProject = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
      throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
