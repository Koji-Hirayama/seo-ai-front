import { Task } from "@/types/modelTypes";
import Link from "next/link";
import React from "react";

type TaskItemProps = {
  task: Task;
};
const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <li className="max-w-[33%] h-[202px] px-4 mb-5">
      <Link
        href={`/${task.id}`}
        className="bg-white w-full h-full shadow-lg rounded-lg block p-2"
      >
        <p>{task.name}</p>
        <p className="mt-4 text-sm">{task.description}</p>
      </Link>
    </li>
  );
};

export default TaskItem;
