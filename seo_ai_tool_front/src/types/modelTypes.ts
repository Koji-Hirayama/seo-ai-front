export interface User {
  id: number;
  email?: string;
  is_superuser?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  last_login?: string;
}

export interface Project {
  id: number;
  name?: string;
  users?: User[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ProjectUser {
  id: number;
  project?: Project;
  user?: User;
  is_admin?: boolean;
}

export interface AiType {
  id: number;
  name?: string;
  description?: string;
  created_at?: string;
}

export interface Task {
  id: number;
  name?: string;
  description?: string;
  ai_type?: AiType;
  project?: Project;
  user?: User;
  is_save?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface Work {
  id: number;
  task?: Task;
  version?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ApiProvider {
  id: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AiModelType {
  id: number;
  name?: string;
  description?: string;
  label?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AiModel {
  id: number;
  name?: string;
  description?: string;
  label?: string;
  ai_model_type?: AiModelType;
  api_provider?: ApiProvider;
  token_limit?: number;
  input_token_cost?: number;
  output_token_cost?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Prompt {
  id: number;
  prompt?: string;
  output_example_model_description?: string;
  output_example_model?: any;
  work?: Work;
  ai_model?: AiModel;
  user?: User;
  order?: number;
  token?: number;
  cost?: number;
  total_cost?: number;
  request_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PromptOutput {
  id: number;
  output?: string;
  output_model?: any;
  prompt?: Prompt;
  work?: Work;
  ai_model?: AiModel;
  user?: User;
  order?: number;
  token?: number;
  cost?: number;
  total_cost?: number;
  is_error?: boolean;
  response_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AiInputType {
  id: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface AiInputFieldType {
  id: number;
  name?: string;
  description?: string;
  context_parameters_json?: any;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface AiInputTypeAiInputFieldType {
  id: number;
  ai_input_type?: AiInputType;
  ai_input_field_type?: AiInputFieldType;
  order?: number;
  created_at?: string;
}

export interface AiInput {
  id: number;
  name?: string;
  description?: string;
  ai_input_type?: AiInputType;
  ai_input_fields?: AiInputField[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface AiInputField {
  id: number;
  name?: string;
  ai_input_field_type?: AiInputFieldType;
  ai_input?: AiInput;
  description?: string;
  question?: string;
  context?: string;
  order?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface AiTypeAiInput {
  ai_input?: AiInput;
  ai_type?: AiType;
  order?: number;
  created_at?: string;
}
