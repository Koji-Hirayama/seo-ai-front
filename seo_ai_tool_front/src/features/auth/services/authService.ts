import { CRED, Auth } from "../types";
import {
  createTokenApi,
  refreshTokenApi,
  signoutApi,
  verifyAccessTokenApi,
} from "../api/authApi";

export const createToken = async (cred: CRED): Promise<void> => {
  await createTokenApi(cred);
};

export const logout = async (): Promise<void> => {
  await signoutApi();
};

export const refreshToken = async (): Promise<void> => {
  try {
    await refreshTokenApi();
  } catch (error) {
    // TODO:　一旦ログアウトは邪魔だからコメント
    await logout();
    throw error;
  }
};

export const initAuth = async (): Promise<Auth> => {
  const auth: Auth = { is_auth: false };
  try {
    // 最初にアクセストークンの検証を試みる
    await verifyAccessToken();
    auth.is_auth = true;
  } catch (error) {
    try {
      // アクセストークンの検証が失敗した場合、リフレッシュトークンで試みる
      await refreshToken();
      auth.is_auth = true;
    } catch (error) {
      throw error;
    }
  }

  return auth;
};

const verifyAccessToken = async (): Promise<void> => {
  try {
    await verifyAccessTokenApi();
  } catch (error) {
    throw error;
  }
};
