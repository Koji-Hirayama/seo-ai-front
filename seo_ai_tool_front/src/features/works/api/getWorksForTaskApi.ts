import { Work } from "@/types/modelTypes";
import { apiClient } from "@/utils/axiosApiClient";

export const getWorksForTaskApi = async (
  projectId: number,
  taskId: number
): Promise<Work[]> => {
  try {
    const res = await apiClient(
      `/${projectId}/get_works_for_task?task_id=${taskId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
