import { Task } from "@/types/modelTypes";
import { createTaskApi } from "../api/createTaskApi";
import { RequestCreateTask } from "../types";
import { AxiosError } from "axios";

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
