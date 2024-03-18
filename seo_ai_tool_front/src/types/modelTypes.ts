export type User = {
  id: number;
  email?: string;
  is_superuser?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  last_login?: string;
};

export type Project = {
  id: number;
  name?: string;
  users?: User[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export type ProjectUser = {
  id: number;
  project?: Project;
  user?: User;
  is_admin?: boolean;
};

export type AiType = {
  id: number;
  name?: string;
  description?: string;
  created_at?: string;
};

export type Task = {
  id: number;
  name?: string;
  description?: string;
  ai_type?: AiType;
  project?: Project;
  user?: User;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
