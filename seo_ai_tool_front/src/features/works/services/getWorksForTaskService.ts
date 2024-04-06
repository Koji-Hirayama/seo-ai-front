import { Work } from "@/types/modelTypes";
import { getWorksForTaskApi } from "../api/getWorksForTaskApi";

export const getWorksForTask = async (
  projectId: number,
  taskId: number
): Promise<Work[]> => {
  try {
    const data = await getWorksForTaskApi(projectId, taskId);
    return data;
  } catch (error) {
    throw error;
  }
};
