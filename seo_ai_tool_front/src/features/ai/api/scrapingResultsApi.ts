import { apiClient } from "@/utils/axiosApiClient";
import { RequestScrapingResults, ScrapingResult } from "../types";

export const scrapingResultsApi = async (
  requestScrapingResults: RequestScrapingResults
): Promise<ScrapingResult[]> => {
  try {
    const res = await apiClient.post<ScrapingResult[]>(
      `/scraping_results/`,
      requestScrapingResults,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
