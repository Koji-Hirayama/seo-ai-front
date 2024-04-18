import { apiClient } from "@/utils/axiosApiClient";
import { PromptMessage, RequestScrapingPromptMessage } from "../types";

export const scrapingPromptMessageApi = async (
  requestScrapingPromptMessage: RequestScrapingPromptMessage
): Promise<PromptMessage> => {
  try {
    const res = await apiClient.post<PromptMessage>(
      `/scraping_prompt_message/`,
      requestScrapingPromptMessage,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
