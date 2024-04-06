import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LoadingScreenStore = {
  isLoadingScreen: boolean;
  loadingScreenLabel: string;
  setIsLoadingScreen: (isLoading: boolean) => void;
  setLoadingScreenLabel: (label: string) => void;
  openLoadingScreen: (label: string) => void;
  resetLoadingScreen: () => void;
};

const defaultIsLoading = false;
const defaultLabel = "";
const useLoadingScreenStore = create<LoadingScreenStore>()(
  devtools((set) => ({
    isLoadingScreen: defaultIsLoading,
    loadingScreenLabel: defaultLabel,
    setIsLoadingScreen: (isLoading) => set({ isLoadingScreen: isLoading }),
    setLoadingScreenLabel: (label) => set({ loadingScreenLabel: label }),
    openLoadingScreen: (label) =>
      set({ isLoadingScreen: true, loadingScreenLabel: label }),
    resetLoadingScreen: () =>
      set({
        isLoadingScreen: defaultIsLoading,
        loadingScreenLabel: defaultLabel,
      }),
  }))
);

export default useLoadingScreenStore;
