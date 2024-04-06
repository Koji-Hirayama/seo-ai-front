import { apiClient } from "@/utils/axiosApiClient";
import { RequestCreateTask } from "../types";
import { Task } from "@/types/modelTypes";

export const createTaskApi = async (
  requertCreateTask: RequestCreateTask
): Promise<Task> => {
  try {
    const res = await apiClient.post<Task>(
      `/${requertCreateTask.project_id}/create_task/`,
      requertCreateTask,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
