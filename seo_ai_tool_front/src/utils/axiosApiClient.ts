import { refreshToken } from "@/features/auth/services/authService";
import axios, { AxiosError } from "axios";

const baseApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 1000 * 30, // 1000ミリ秒 = 1秒
});

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 1000 * 30, // 1000ミリ秒 = 1秒
});

// インターセプターIDを保持するための変数を定義
let initApiClientResponseInterceptorId: number | null = null;
const initApiClient = (
  generalErrorFn: (error: AxiosError) => void,
  tokenErrorFn: (error: AxiosError) => void
) => {
  // 既存のレスポンスインターセプターがあれば削除

  if (initApiClientResponseInterceptorId !== null) {
    apiClient.interceptors.response.eject(initApiClientResponseInterceptorId);
  }

  initApiClientResponseInterceptorId = apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // トークンエラーの場合（401）
      if (error.response && error.response.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshToken(); // トークンリフレッシュを試行
            return axios(originalRequest); // リフレッシュ成功後、元のリクエストを再実行
          } catch (_error) {
            const axiosError = _error as AxiosError;
            // リフレッシュトークンが無効な場合の処理
            tokenErrorFn(axiosError);
            return Promise.reject(_error);
          }
        } else {
          // リトライ済みの場合はそのままエラーを返す（無限ループ防止）
          generalErrorFn(error);
          return Promise.reject(error);
        }
      }

      // トークンエラー以外の場合
      // ここで任意のエラー処理を行う
      generalErrorFn(error);
      return Promise.reject(error);
    }
  );
};

export { baseApiClient, apiClient, initApiClient };
