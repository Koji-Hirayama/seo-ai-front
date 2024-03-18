import { CRED, Token, ResponseAuthDetail } from "../types";
import { baseApiClient } from "@/utils/axiosApiClient";

export const createTokenApi = async (cred: CRED): Promise<Token> => {
  try {
    const res = await baseApiClient.post<Token>(`/login/`, cred, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log("Api層でのエラー", error);
    throw error;
  }
};

export const refreshTokenApi = async (): Promise<ResponseAuthDetail> => {
  try {
    const res = await baseApiClient.get<ResponseAuthDetail>(`/token_refresh/`);
    return res.data;
  } catch (error) {
    console.log("Api層でのエラー", error);
    throw error;
  }
};

export const verifyAccessTokenApi = async (): Promise<ResponseAuthDetail> => {
  try {
    const res = await baseApiClient.get<ResponseAuthDetail>(`/token_verify/`);
    return res.data;
  } catch (error) {
    console.log("Api層でのエラー", error);
    throw error;
  }
};

export const signoutApi = async (): Promise<ResponseAuthDetail> => {
  try {
    const res = await baseApiClient.get<ResponseAuthDetail>(`/logout/`);
    return res.data;
  } catch (error) {
    console.log("Api層でのエラー", error);
    throw error;
  }
};
