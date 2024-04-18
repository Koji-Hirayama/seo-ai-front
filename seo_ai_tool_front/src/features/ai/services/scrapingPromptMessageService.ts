import { scrapingPromptMessageApi } from "../api/scrapingPromptMessageApi";
import { PromptMessage, RequestScrapingPromptMessage } from "../types";

export const scrapingPromptMessage = async (
  requestScrapingPromptMessage: RequestScrapingPromptMessage
): Promise<PromptMessage> => {
  try {
    const data = await scrapingPromptMessageApi(requestScrapingPromptMessage);
    return data;
  } catch (error) {
    throw error;
  }
};
