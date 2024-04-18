import queryKeys from "@/constants/queryKeys";
import { AiModel } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import { getAiModels } from "../services/getAiModelsService";

export const useQueryGetAiModels = () => {
  return useQuery<AiModel[], Error>({
    queryKey: queryKeys.aiModels.all,
    queryFn: getAiModels,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
