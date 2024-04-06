import useParamsStore from "@/stores/paramsStore";
import { Work } from "@/types/modelTypes";
import Link from "next/link";
import React from "react";

type WorkItemProps = {
  work: Work;
};
const WorkItem = ({ work }: WorkItemProps) => {
  const { projectId, taskId } = useParamsStore();
  return (
    <li className="max-w-[33%] h-[202px] px-4 mb-5">
      <Link
        href={`/products/projects/${projectId}/tasks/${taskId}/works/${work.id}/chat`}
        className="bg-white w-full h-full shadow-lg rounded-lg block p-2"
      >
        <p>{work.version}</p>
      </Link>
    </li>
  );
};

export default WorkItem;
