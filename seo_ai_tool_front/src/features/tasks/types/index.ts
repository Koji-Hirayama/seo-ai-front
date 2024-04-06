export interface RequestCreateTask {
  name: string;
  description: string;
  project_id: number;
  ai_type_id: number;
  is_save: boolean;
}
