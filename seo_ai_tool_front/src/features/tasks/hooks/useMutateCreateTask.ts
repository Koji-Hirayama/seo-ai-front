import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/createTaskService";
import queryKeys from "@/constants/queryKeys";
import { Task } from "@/types/modelTypes";

export const useMutateCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (data, variables) => {
      const key = queryKeys.tasks.byProjectId(variables.project_id);
      const previousData = queryClient.getQueryData<Task[]>(key);
      if (previousData) {
        queryClient.setQueryData<Task[]>(key, [...previousData, data]);
      }
    },
  });
};
