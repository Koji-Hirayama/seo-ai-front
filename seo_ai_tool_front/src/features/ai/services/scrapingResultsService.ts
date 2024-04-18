import { scrapingResultsApi } from "../api/scrapingResultsApi";
import { RequestScrapingResults, ScrapingResult } from "../types";

export const scrapingResults = async (
  requestScrapingResults: RequestScrapingResults
): Promise<ScrapingResult[]> => {
  try {
    const data = await scrapingResultsApi(requestScrapingResults);
    return data;
  } catch (error) {
    throw error;
  }
};
