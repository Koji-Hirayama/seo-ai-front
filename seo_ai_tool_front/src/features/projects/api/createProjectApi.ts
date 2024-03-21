import { apiClient } from "@/utils/axiosApiClient";
import { RequestCreateProject } from "../types";
import { ProjectUser } from "@/types/modelTypes";
import { headers } from "next/headers";

export const createProjectApi = async (
  requestCreateProject: RequestCreateProject
): Promise<ProjectUser> => {
  try {
    const res = await apiClient.post(`/create_project/`, requestCreateProject, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await res).data;
  } catch (error) {
    throw error;
  }
};
