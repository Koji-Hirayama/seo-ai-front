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
