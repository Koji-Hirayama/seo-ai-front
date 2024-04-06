import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LoadingModalStore = {
  isLoadingModal: boolean;
  loadingModalLabel: string;
  setIsLoadingModal: (isLoading: boolean) => void;
  setLoadingModalLabel: (label: string) => void;
  openLoadingModal: (label: string) => void;
  resetLoadingModal: () => void;
};

const defaultIsLoading = false;
const defaultLabel = "処理中です";
const useLoadingModalStore = create<LoadingModalStore>()(
  devtools((set) => ({
    isLoadingModal: defaultIsLoading,
    loadingModalLabel: defaultLabel,
    setIsLoadingModal: (isLoading) => set({ isLoadingModal: isLoading }),
    setLoadingModalLabel: (label) => set({ loadingModalLabel: label }),
    openLoadingModal: (label) =>
      set({ isLoadingModal: true, loadingModalLabel: label }),
    resetLoadingModal: () =>
      set({
        isLoadingModal: defaultIsLoading,
        loadingModalLabel: defaultLabel,
      }),
  }))
);

export default useLoadingModalStore;
