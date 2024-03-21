import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/createProjectService";
import queryKeys from "@/constants/queryKeys";
import { ProjectUser } from "@/types/modelTypes";

export const useMutateCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess(data, variables) {
      const key = queryKeys.projects.byUser;
      const previousData = queryClient.getQueryData<ProjectUser[]>(key);
      if (previousData) {
        queryClient.setQueryData<ProjectUser[]>(key, [...previousData, data]);
      }
    },
    onError(error) {},
  });
};
