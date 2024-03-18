import { ProjectUser } from "@/types/modelTypes";
import { apiClient } from "@/utils/axiosApiClient";

export const getProjectsForUserApi = async (): Promise<ProjectUser[]> => {
  try {
    const res = await apiClient.get(`/get_projects_for_user/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
