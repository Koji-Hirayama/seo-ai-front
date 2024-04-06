import queryKeys from "@/constants/queryKeys";
import { AiType } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import { getAiTypes } from "../services/getAiTypesService";

export const useQueryGetAiTypes = () => {
  return useQuery<AiType[], Error>({
    queryKey: queryKeys.aiTypes.all,
    queryFn: getAiTypes,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
