import { aiResponseApi } from "../api/aiResponseApi";
import { RequestAi, ResponseAi } from "../types";

export const aiResponse = async (requestAi: RequestAi): Promise<ResponseAi> => {
  try {
    const data = await aiResponseApi(requestAi);
    return data;
  } catch (error) {
    throw error;
  }
};
