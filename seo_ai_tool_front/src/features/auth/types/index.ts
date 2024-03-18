export type Token = {
  refresh: string;
  access: string;
};

export type CRED = {
  email: string;
  password: string;
};

export type ResponseAuthDetail = {
  detail: string;
};

export type Auth = {
  is_auth: boolean;
};
