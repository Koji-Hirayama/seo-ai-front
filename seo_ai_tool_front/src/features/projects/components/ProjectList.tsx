import React from "react";
import ProjectItem from "./ProjectItem";
import { ProjectUser } from "@/types/modelTypes";

type ProjectListProps = {
  projectUsers: ProjectUser[];
};

const ProjectList = ({ projectUsers }: ProjectListProps) => {
  return (
    <ul className="flex flex-wrap mt-2">
      {projectUsers.map((projectUser) => (
        <ProjectItem key={projectUser.id} projectUser={projectUser} />
      ))}
    </ul>
  );
};

export default ProjectList;
