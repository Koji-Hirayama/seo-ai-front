import { apiClient } from "@/utils/axiosApiClient";
import { RequestGetAiTypeAiInputFields } from "../../aiInputs/types";
import { AiTypeAiInput } from "@/types/modelTypes";

export const getAiTypeAiInputFieldsApi = async (
  request: RequestGetAiTypeAiInputFields
): Promise<AiTypeAiInput[]> => {
  try {
    const res = await apiClient.get<AiTypeAiInput[]>(
      `/${request.project_id}/ai/get_ai_type_input_fields?ai_type_id=${request.ai_type_id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
