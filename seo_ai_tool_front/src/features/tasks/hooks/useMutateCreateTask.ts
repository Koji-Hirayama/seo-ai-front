import { useMutation } from "@tanstack/react-query";
import { createTask } from "../services/createTaskService";

export const useMutateCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (res) => {},
    onError: (error) => {},
  });
};
