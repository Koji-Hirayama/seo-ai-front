import { taskAiApi } from "../api/taskAiApi";
import { RequestAi, ResponseAi } from "../types";

export const taskAi = async (requestAi: RequestAi): Promise<ResponseAi> => {
  try {
    const data = await taskAiApi(requestAi);
    return data;
  } catch (error) {
    throw error;
  }
};
