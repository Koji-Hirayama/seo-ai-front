import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskAi } from "../services/taskAiService";

export const useMutateTaskAi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: taskAi,
    onSuccess(data, veriables) {},
  });
};
