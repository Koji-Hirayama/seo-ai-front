import useErrorModalStore from "@/stores/errorModalStore";
import { AxiosError } from "axios";

// 通常のResponseエラー時(ログイン認証以外)
export const useAxiosResponseError = () => {
  const { setErrorModalText, setErrorModalClickEvent, setErrorModalBtnLabel } =
    useErrorModalStore();
  const setError = (
    error: AxiosError,
    errorMessage?: string,
    errorBtnLabel?: string,
    onClick?: () => void
  ) => {
    if (error.response && error.response.status !== 401) {
      errorMessage && setErrorModalText(errorMessage);
      onClick && setErrorModalClickEvent(onClick);
      errorBtnLabel && setErrorModalBtnLabel(errorBtnLabel);
    }
  };
  return { setError };
};
