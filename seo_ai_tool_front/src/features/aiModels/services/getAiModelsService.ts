import { AiModel } from "@/types/modelTypes";
import { getAiModelsApi } from "../api/getAiModelsApi";

export const getAiModels = async (): Promise<AiModel[]> => {
  try {
    const data = await getAiModelsApi();
    return data;
  } catch (error) {
    throw error;
  }
};
