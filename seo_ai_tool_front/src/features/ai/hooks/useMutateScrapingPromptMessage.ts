import { useMutation } from "@tanstack/react-query";
import { scrapingPromptMessage } from "../services/scrapingPromptMessageService";

export const useMutateScrapingPromptMessage = () => {
  return useMutation({
    mutationFn: scrapingPromptMessage,
    onSuccess(data, veriables) {},
  });
};
