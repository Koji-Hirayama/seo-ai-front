import { useMutation } from "@tanstack/react-query";
import { scrapingResults } from "../services/scrapingResultsService";

export const useMutateScrapingResults = () => {
  return useMutation({
    mutationFn: scrapingResults,
    onSuccess(data, veriables) {},
  });
};
