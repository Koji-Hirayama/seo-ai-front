import Link from "next/link";
import React from "react";
import { useQueryGetProjectsForUser } from "../hooks/useQueryGetProjectsForUser";

const Projects = () => {
  const { data: projectUsers, status, error } = useQueryGetProjectsForUser();

  if (status === "pending") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    console.log(error);
    return <span>Error</span>;
  }

  return (
    <div>
      <div className="p-2">
        <button className="btn1 text-[12px]">新規プロジェクト</button>
      </div>
      <div className="mt-10">
        <p className="px-4">プロジェクト</p>
        <ul className="flex flex-wrap mt-2">
          {projectUsers.map((projectUser) => (
            <li
              key={projectUser.id}
              className="min-w-[33%] h-[202px] px-4 mb-5"
            >
              <Link
                href={`/products/projects/${projectUser.project?.id}/tasks`}
                className="bg-white w-full h-full shadow-lg rounded-lg block p-2"
              >
                <p>{projectUser.project?.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
