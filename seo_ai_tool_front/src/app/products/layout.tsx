"use client";
import LoadingModal from "@/components/loadings/LoadingModal";
import LoadingScreen from "@/components/loadings/LoadingScreen";
import useMutateAuth from "@/features/auth/hooks/useMutateAuth";
import { useAuthStore } from "@/features/auth/stores/authStore";
import useLoadingModalStore from "@/stores/loadingModalStore";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import { initApiClient } from "@/utils/axiosApiClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("products");
  const { isAuthenticated } = useAuthStore();
  const { isLoadingModal, loadingModalLabel } = useLoadingModalStore();
  const {
    isLoadingScreen,
    loadingScreenLabel,
    setLoadingScreen,
    resetLoadingScreen,
  } = useLoadingScreenStore();
  const { initAuthMutation } = useMutateAuth();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      console.log("initAuth");
      await initAuthMutation.mutateAsync();
      initApiClient(() => {
        window.alert("再度ログインが必要です。\nログインページへ遷移します。");
        router.push("/auth/signin");
      });
    };
    initAuth();
  }, []);
  if (!isAuthenticated) {
    return <LoadingScreen isLoading={true} label={"ログイン認証中"} />;
  }
  return (
    <div className="text-textColor1">
      {isAuthenticated && (
        <>
          {children}
          <LoadingScreen
            isLoading={isLoadingScreen}
            label={loadingScreenLabel}
          />
          <LoadingModal isOpen={isLoadingModal} label={loadingModalLabel} />
        </>
      )}
    </div>
  );
}
