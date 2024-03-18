import { AiType } from "@/types/modelTypes";
import { getAiTypesApi } from "../api/getAiTypesApi";

export const getAiTypes = async (): Promise<AiType[]> => {
  try {
    const data = await getAiTypesApi();
    return data;
  } catch (error) {
    throw error;
  }
};
