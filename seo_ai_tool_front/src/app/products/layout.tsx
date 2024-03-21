"use client";
import LoadingModal from "@/components/loadings/LoadingModal";
import LoadingScreen from "@/components/loadings/LoadingScreen";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import useMutateAuth from "@/features/auth/hooks/useMutateAuth";
import { useAuthStore } from "@/features/auth/stores/authStore";
import useConfirmModalStore from "@/stores/confirmModalStore";
import useErrorModalStore from "@/stores/errorModalStore";
import useLoadingModalStore from "@/stores/loadingModalStore";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import useSuccessModalStore from "@/stores/successModalStore";
import { initApiClient } from "@/utils/axiosApiClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("products");
  // ログイン認証系
  const { isAuthenticated, setIsAuth } = useAuthStore();
  const { initAuthMutation } = useMutateAuth();
  // システム制御系
  const { isLoadingModal, loadingModalLabel } = useLoadingModalStore();
  const { isLoadingScreen, loadingScreenLabel } = useLoadingScreenStore();
  const {
    isSuccessModal,
    successModalText,
    successModalClickEvent,
    successModalBtnLabel,
    resetSuccessModal,
  } = useSuccessModalStore();
  const {
    isErrorModal,
    errorModalTitle,
    errorModalText,
    errorModalResData,
    errorModalBtnLabel,
    errorModalClickEvent,
    setIsErrorModal,
    setErrorModalTitle,
    setErrorModalResJson,
    resetErrorModal,
  } = useErrorModalStore();
  const {
    isConfirmModal,
    confirmModalTitle,
    confirmModalText,
    confirmModalYesLabel,
    confirmModalNoLabel,
    confirmModalOnYes,
    confirmModalOnNo,
    confirmModalWidth,
    openSingleConfirm,
    resetConfirmModal,
  } = useConfirmModalStore();
  const router = useRouter();

  // ログイン認証エラー
  const authErrorConfirm = () => {
    openSingleConfirm(
      "ログインの有効期限が切れました。",
      "再度ログインが必要です。ログインページへ戻ります。",
      () => {
        router.push("/auth/signin");
      },
      "OK",
      "36%"
    );
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("initAuth");
      //ログイン認証確認
      await initAuthMutation
        .mutateAsync()
        .then((res) => {
          setIsAuth(res.is_auth);
        })
        .catch((error) => {
          // ログイン認証エラー
          authErrorConfirm();
        });
      //認証済みApiClientのセットアップ
      initApiClient(
        (error) => {
          // 通常エラー
          setIsErrorModal(true);
          setErrorModalTitle("Response Error");
          const data = error.response?.data;
          if (data && typeof data === "object" && data !== null) {
            // オブジェクトであり、nullではないことを確認
            setErrorModalResJson(error.response?.data as object);
          }
        },
        (error) => {
          // ログイン認証エラー
          authErrorConfirm();
        }
      );
    };
    initAuth();
  }, []);
  return (
    <div className="text-textColor1">
      {isAuthenticated ? (
        <>{children}</>
      ) : (
        <LoadingScreen isOpen={true} label={"ログイン認証中"} />
      )}
      <LoadingScreen isOpen={isLoadingScreen} label={loadingScreenLabel} />
      <LoadingModal isOpen={isLoadingModal} label={loadingModalLabel} />
      <SuccessModal
        isOpen={isSuccessModal}
        text={successModalText}
        onClick={successModalClickEvent}
        onClose={resetSuccessModal}
        btnLabel={successModalBtnLabel}
      />
      <ErrorModal
        isOpen={isErrorModal}
        onClick={errorModalClickEvent}
        onClose={resetErrorModal}
        title={errorModalTitle}
        text={errorModalText}
        errorResData={errorModalResData}
        btnLabel={errorModalBtnLabel}
      />
      <ConfirmModal
        isOpen={isConfirmModal}
        title={confirmModalTitle}
        onClose={resetConfirmModal}
        onYes={confirmModalOnYes}
        onNo={confirmModalOnNo}
        yesLabel={confirmModalYesLabel}
        noLabel={confirmModalNoLabel}
        width={confirmModalWidth}
      >
        <p className="text-left">{confirmModalText}</p>
      </ConfirmModal>
    </div>
  );
}
