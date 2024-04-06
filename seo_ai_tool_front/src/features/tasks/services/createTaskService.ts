import { Task } from "@/types/modelTypes";
import { createTaskApi } from "../api/createTaskApi";
import { RequestCreateTask } from "../types";

export const createTask = async (
  requertCreateTask: RequestCreateTask
): Promise<Task> => {
  try {
    const data = await createTaskApi(requertCreateTask);
    return data;
  } catch (error) {
    throw error;
  }
};
