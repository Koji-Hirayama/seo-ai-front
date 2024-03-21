import { ProjectUser } from "@/types/modelTypes";
import { createProjectApi } from "../api/createProjectApi";
import { RequestCreateProject } from "../types";

export const createProject = async (
  requestCreateProject: RequestCreateProject
): Promise<ProjectUser> => {
  try {
    const data = await createProjectApi(requestCreateProject);
    return data;
  } catch (error) {
    throw error;
  }
};
