import { AiModel } from "@/types/modelTypes";
import { apiClient } from "@/utils/axiosApiClient";

export const getAiModelsApi = async (): Promise<AiModel[]> => {
  try {
    const res = await apiClient.get(`/get_aimodels`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
