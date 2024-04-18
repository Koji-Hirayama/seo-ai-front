import { apiClient } from "@/utils/axiosApiClient";
import { RequestAi, ResponseAi } from "../types";

export const aiResponseApi = async (
  requestAi: RequestAi
): Promise<ResponseAi> => {
  try {
    const res = await apiClient.post<ResponseAi>(
      `/${requestAi.project_id}/ai/scraping_prompt_ai/`,
      requestAi.prompt,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
