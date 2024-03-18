import { getTasksForProjectApi } from "../api/getTasksForProjectApi";
import { ProjectTasks } from "../types";

export const getTasksForProject = async (
  projectId: number
): Promise<ProjectTasks> => {
  try {
    const data = await getTasksForProjectApi(projectId);
    return data;
  } catch (error) {
    throw error;
  }
};
