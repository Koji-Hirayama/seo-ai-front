export interface Token {
  refresh: string;
  access: string;
}

export interface CRED {
  email: string;
  password: string;
}

export interface ResponseAuthDetail {
  detail: string;
}

export interface Auth {
  is_auth: boolean;
}
