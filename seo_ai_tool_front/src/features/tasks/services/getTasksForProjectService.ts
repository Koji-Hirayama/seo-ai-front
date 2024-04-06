import { Task } from "@/types/modelTypes";
import { getTasksForProjectApi } from "../api/getTasksForProjectApi";

export const getTasksForProject = async (
  projectId: number
): Promise<Task[]> => {
  try {
    const data = await getTasksForProjectApi(projectId);
    return data;
  } catch (error) {
    throw error;
  }
};
