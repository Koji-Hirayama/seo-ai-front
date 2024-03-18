import { useQuery } from "@tanstack/react-query";
import { getTasksForProject } from "../services/getTasksForProjectService";
import { ProjectTasks } from "../types";
import queryKeys from "@/constants/queryKeys";

export const useQueryGetTasksForProject = (projectId: number) => {
  return useQuery<ProjectTasks, Error>({
    queryKey: queryKeys.tasks.byProjectId(projectId),
    queryFn: () => getTasksForProject(projectId),
    staleTime: 0,
  });
};
