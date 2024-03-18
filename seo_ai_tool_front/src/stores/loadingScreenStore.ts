import { create } from "zustand";

type LoadingScreenStore = {
  isLoadingScreen: boolean;
  loadingScreenLabel: string;
  setIsLoadingScreen: (isLoading: boolean) => void;
  setLoadingScreenLabel: (label: string) => void;
  setLoadingScreen: (isLoading: boolean, label: string) => void;
  resetLoadingScreen: () => void;
};

const defaultIsLoading = false;
const defaultLabel = "";
const useLoadingScreenStore = create<LoadingScreenStore>((set) => ({
  isLoadingScreen: defaultIsLoading,
  loadingScreenLabel: defaultLabel,
  setIsLoadingScreen: (isLoading) => set({ isLoadingScreen: isLoading }),
  setLoadingScreenLabel: (label) => set({ loadingScreenLabel: label }),
  setLoadingScreen: (isLoading, label) =>
    set({ isLoadingScreen: isLoading, loadingScreenLabel: label }),
  resetLoadingScreen: () =>
    set({
      isLoadingScreen: defaultIsLoading,
      loadingScreenLabel: defaultLabel,
    }),
}));

export default useLoadingScreenStore;
