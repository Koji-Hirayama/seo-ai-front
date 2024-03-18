import { Task } from "@/types/modelTypes";

export type ProjectTasks = {
  id: number;
  name: string;
  tasks: Task[];
};

export type RequestCreateTask = {
  name: string;
  description: string;
  project_id: number;
  ai_type_id: number;
};
