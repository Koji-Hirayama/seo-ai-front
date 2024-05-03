import { AiTypeAiInput } from "@/types/modelTypes";
import { getAiTypeAiInputFieldsApi } from "../api/getAiTypeAiInputFieldsApi";
import { RequestGetAiTypeAiInputFields } from "../types";

export const getAiTypeAiInputFields = async (
  request: RequestGetAiTypeAiInputFields
): Promise<AiTypeAiInput[]> => {
  try {
    const data = await getAiTypeAiInputFieldsApi(request);
    return data;
  } catch (error) {
    throw error;
  }
};
