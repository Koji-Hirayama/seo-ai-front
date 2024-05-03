import { useQuery } from "@tanstack/react-query";

import { AiTypeAiInput } from "@/types/modelTypes";
import queryKeys from "@/constants/queryKeys";
import { getAiTypeAiInputFields } from "../services/getAiTypeAiInputFieldsService";
import { RequestGetAiTypeAiInputFields } from "../types";

export const useQueryGetAiTypeAiInputFields = (
  request: RequestGetAiTypeAiInputFields
) => {
  return useQuery<AiTypeAiInput[], Error>({
    queryKey: queryKeys.aiTypeAiInputFields.byAiTypeId(request.ai_type_id),
    queryFn: () => getAiTypeAiInputFields(request),
    staleTime: Infinity,
  });
};
