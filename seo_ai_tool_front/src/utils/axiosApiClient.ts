import { refreshToken } from "@/features/auth/services/authService";
import axios from "axios";

const baseApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// インターセプターIDを保持するための変数を定義
let initApiClientResponseInterceptorId: number | null = null;
const initApiClient = (tokenErrorFn: () => void) => {
  // 既存のレスポンスインターセプターがあれば削除
  if (initApiClientResponseInterceptorId !== null) {
    apiClient.interceptors.response.eject(initApiClientResponseInterceptorId);
  }
  initApiClientResponseInterceptorId = apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await refreshToken(); // トークンリフレッシュを試行
          return axios(originalRequest); // リフレッシュ成功後、元のリクエストを再実行
        } catch (_error) {
          // リフレッシュトークンが無効な場合の処理
          tokenErrorFn();
          return Promise.reject(_error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export { baseApiClient, apiClient, initApiClient };
