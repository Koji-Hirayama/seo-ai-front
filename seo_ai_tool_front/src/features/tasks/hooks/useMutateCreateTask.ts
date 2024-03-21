import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/createTaskService";
import queryKeys from "@/constants/queryKeys";
import { ProjectTasks } from "../types";
import { useAxiosResponseError } from "@/hooks/useError";
import { AxiosError } from "axios";

export const useMutateCreateTask = () => {
  const queryClient = useQueryClient();
  const { setError } = useAxiosResponseError();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (data, variables) => {
      const key = queryKeys.tasks.byProjectId(variables.project_id);
      const previousData = queryClient.getQueryData<ProjectTasks>(key);
      if (previousData) {
        const addNewTasks = [...previousData.tasks, data];
        const updateProjectTasks = { ...previousData, tasks: addNewTasks };
        queryClient.setQueryData<ProjectTasks>(key, updateProjectTasks);
      }
    },
  });
};
