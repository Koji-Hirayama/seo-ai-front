import { ProjectUser } from "@/types/modelTypes";
import Link from "next/link";
import React from "react";

type ProjectItemProps = {
  projectUser: ProjectUser;
};

const ProjectItem = ({ projectUser }: ProjectItemProps) => {
  return (
    <li className="min-w-[33%] h-[202px] px-4 mb-5">
      <Link
        href={`/products/projects/${projectUser.project?.id}/tasks`}
        className="bg-white w-full h-full shadow-lg rounded-lg block p-2"
      >
        <p>{projectUser.project?.name}</p>
      </Link>
    </li>
  );
};

export default ProjectItem;
