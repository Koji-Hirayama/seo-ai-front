import { create } from "zustand";

type LoadingModalStore = {
  isLoadingModal: boolean;
  loadingModalLabel: string;
  setIsLoadingModal: (isLoading: boolean) => void;
  setLoadingModalLabel: (label: string) => void;
  setLoadingModal: (isLoading: boolean, label: string) => void;
  resetLoadingModal: () => void;
};

const defaultIsLoading = false;
const defaultLabel = "処理中です";
const useLoadingModalStore = create<LoadingModalStore>((set) => ({
  isLoadingModal: defaultIsLoading,
  loadingModalLabel: defaultLabel,
  setIsLoadingModal: (isLoading) => set({ isLoadingModal: isLoading }),
  setLoadingModalLabel: (label) => set({ loadingModalLabel: label }),
  setLoadingModal: (isLoading, label) =>
    set({ isLoadingModal: isLoading, loadingModalLabel: label }),
  resetLoadingModal: () =>
    set({ isLoadingModal: defaultIsLoading, loadingModalLabel: defaultLabel }),
}));

export default useLoadingModalStore;
