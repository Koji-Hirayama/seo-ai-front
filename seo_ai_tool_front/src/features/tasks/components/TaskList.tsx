import React, { memo } from "react";
import { Task } from "@/types/modelTypes";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  console.log("TaskList");
  return (
    <ul className="flex flex-wrap mt-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

const TaskListMemo = memo(TaskList);
export default TaskListMemo;
