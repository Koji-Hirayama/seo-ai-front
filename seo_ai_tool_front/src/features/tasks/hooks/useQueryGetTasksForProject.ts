import { useQuery } from "@tanstack/react-query";
import { getTasksForProject } from "../services/getTasksForProjectService";
import queryKeys from "@/constants/queryKeys";
import { Task } from "@/types/modelTypes";

export const useQueryGetTasksForProject = (projectId: number) => {
  return useQuery<Task[], Error>({
    queryKey: queryKeys.tasks.byProjectId(projectId),
    queryFn: () => getTasksForProject(projectId),
    staleTime: 0,
  });
};
