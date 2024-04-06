import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiResponse } from "../services/aiResponseService";

export const useMutateAiResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aiResponse,
    onSuccess(data, veriables) {},
  });
};
