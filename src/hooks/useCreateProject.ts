// hooks/useCreateProject.ts
import { useState } from "react";
import { api } from "~/utils/api";
import { Project } from "@prisma/client";


export const useCreateProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = api.projects.getProjects.useQuery(undefined, {
    enabled: true,
    onSuccess: (data) => {
      setProjects([
        ...data.owned,
        ...data.member,
      ].filter((value, index, self) => self.findIndex(v => v.id === value.id) === index));
    },
    onError: (error) => {
      console.error("Failed to fetch projects", error);
    },
  });

  const createProjectMutation = api.projects.createProject.useMutation({
    onSuccess: (createdProject) => {
      setProjects((prevProjects) => [...prevProjects, createdProject]);
    },
    onError: (error) => {
      console.error("Failed to create project:", error);
    },
  });

  const handleCreateProject = (projectFormData: ProjectFormData) => {
    createProjectMutation.mutate(projectFormData);
  };

  return {
    projects,
    handleCreateProject,
  };
};
