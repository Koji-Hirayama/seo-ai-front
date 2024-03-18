import { ProjectUser } from "@/types/modelTypes";
import { getProjectsForUserApi } from "../api/getProjectsForUserApi";

export const getProjectsForUser = async (): Promise<ProjectUser[]> => {
  try {
    const data = await getProjectsForUserApi();
    return data;
  } catch (error) {
    throw error;
  }
};
