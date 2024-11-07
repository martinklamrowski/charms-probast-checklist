import Link from "next/link";
import React, { ReactNode } from "react";
import { Project } from "@prisma/client";

import { useProject } from "~/contexts/ProjectContext";
import ProjectOverviewCardTip from "./ProjectOverviewCardTip";


interface ProjectOverviewCardProps {
  children: ReactNode;
  project: Project;
}

const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({ children, project }) => {
  const { openProject } = useProject();

  const handleOpenClick = () => {
    openProject(project); // Set this project as the active project
  };


  return (
    <div className="card bg-base-100 w-64 h-64 shadow-xl">
      {/* <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
      </figure> */}
      <div className="card-body">
        <h2 className="card-title">
          Systematic Review
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{project.name}</p>
        <ProjectOverviewCardTip>
          {project.description}
        </ProjectOverviewCardTip>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">CHARMS</div>
          <div className="badge badge-outline">PROBAST</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectOverviewCard;