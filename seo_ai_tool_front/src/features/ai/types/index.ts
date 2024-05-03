import { Error } from "@/types";
import { Prompt, PromptOutput, Work } from "@/types/modelTypes";

// ==========================================
// メインAI
// ==========================================
export interface ExampleTableRow {
  key: string;
  type: AiOutputExampleTableTieldType;
  description: string;
  examples: string[];
}

export interface TableRow {
  key: string;
  type: string;
  description: string;
  examples: string[];
}
export interface Table {
  keys: TableRow[];
}

export interface TableDatas {
  datas: Record<string, any>[];
}

export interface TableSchema {
  key: string;
  type: string;
  description: string;
  examples: string;
}

export interface TableSchemas {
  datas: TableSchema[];
}

export interface RequestPrompt {
  urls: string[];
  prompt_user_input: string;
  output_example_model_description: string;
  output_example_model: Table;
  task_id: number;
  ai_model_id: number;
  ai_type_id: number;
}

export interface RequestAi {
  project_id: number;
  prompt: RequestPrompt;
}

export interface ResponseAi {
  prompt: Prompt;
  prompt_output: PromptOutput;
  work: Work;
}

export interface AiOutputExampleTableTieldType {
  fieldType: string;
}

// 出力
export interface Output {
  id: string;
  answerer: string;
  datas: any[];
  status: "success" | "loading";
  tabCategory: string;
  outputCategory: OutputCategory;
}
export type OutputCategory = "prompt" | "output" | "scraping" | "error";
// エラー出力
export interface ErrorOutput {
  error: Error;
}
// ==========================================

// ==========================================
// スクレイピング取得系
// ==========================================
// スクレイピング結果取得
export interface RequestScrapingResults {
  urls: string[];
}
export interface ScrapingResult {
  url: string;
  result: string;
}
// ==========================================

// ==========================================
// プロンプト取得系
// ==========================================
export interface PromptMessage {
  prompt: string;
}
// スクレイピング結果を含むプロンプト取得理リクエスト
export interface RequestScrapingPromptMessage {
  urls: string[];
  input: string;
  ai_input_field_id: number;
}
// ==========================================

// ==========================================
// AIのインプットフィールド取得
// ==========================================
export interface RequestGetAiTypeAiInputFields {
  project_id: number;
  ai_type_id: number;
}

// ==========================================
