import { apiClient } from "@/utils/axiosApiClient";
import { Task } from "@/types/modelTypes";

export const getTasksForProjectApi = async (
  projectId: number
): Promise<Task[]> => {
  try {
    const res = await apiClient.get(
      `/${projectId}/get_tasks_for_project?project_id=${projectId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
