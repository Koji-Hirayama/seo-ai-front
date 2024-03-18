import { AiType } from "@/types/modelTypes";
import { apiClient } from "@/utils/axiosApiClient";

export const getAiTypesApi = async (): Promise<AiType[]> => {
  try {
    const res = await apiClient.get(`/get_aitypes/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
