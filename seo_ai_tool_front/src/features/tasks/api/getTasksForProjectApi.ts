import { apiClient } from "@/utils/axiosApiClient";
import { ProjectTasks } from "../types";

export const getTasksForProjectApi = async (
  projectId: number
): Promise<ProjectTasks> => {
  try {
    const res = await apiClient.get(
      `/get_tasks_for_project?project_id=${projectId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
