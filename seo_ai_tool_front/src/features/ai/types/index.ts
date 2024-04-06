export interface TableRow {
  key: string;
  type: string;
  description: string;
  examples: string[];
}
export interface Table {
  keys: TableRow[];
}

export interface Prompt {
  url: string;
  input: string;
  input_table: string;
  output_example_table: Table;
  work_id: number;
  llm_id: number;
}

export interface RequestAi {
  project_id: number;
  prompt: Prompt;
}

export interface ResponseAi {
  id: number;
  output: string;
  output_json: {
    [key: string]: any; // 可変するキーと値を持つオブジェクト
  };
  prompt: number;
  llm: number;
}
