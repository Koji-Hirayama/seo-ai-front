import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  isAuthenticated: Boolean;
};

type Actions = {
  setIsAuth: (isAuthenticated: boolean) => void;
};

export const useAuthStore = create<State & Actions>()(
  devtools((set) => ({
    isAuthenticated: false,
    setIsAuth: (isAuthenticated: boolean) =>
      set(() => ({ isAuthenticated: isAuthenticated })),
  }))
);
