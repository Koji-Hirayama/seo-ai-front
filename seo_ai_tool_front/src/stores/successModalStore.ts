import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SuccessModalStore = {
  isSuccessModal: boolean;
  successModalText: string;
  successModalBtnLabel: string;
  successModalClickEvent: () => void;
  setIsSuccessModal: (isOpen: boolean) => void;
  setSuccessModalText: (text: string) => void;
  setSuccessModalBtnLabel: (btnLabel: string) => void;
  setSuccessModalClickEvent: (clickEvent: () => void) => void;
  setOpenSuccessModal: (
    text: string,
    btnLabel: string,
    clickEvent: () => void
  ) => void;
  resetSuccessModal: () => void;
};

const defaultIsOpen = false;
const defaultText = "Success";
const defaultBtnLabel = "Continue";
const defaultClickEvent = () => {};
const useSuccessModalStore = create<SuccessModalStore>()(
  devtools((set) => ({
    isSuccessModal: defaultIsOpen,
    successModalText: defaultText,
    successModalBtnLabel: defaultBtnLabel,
    successModalClickEvent: defaultClickEvent,
    setIsSuccessModal: (isOpen) => set({ isSuccessModal: isOpen }),
    setSuccessModalText: (text) => set({ successModalText: text }),
    setSuccessModalBtnLabel: (btnLabel) =>
      set({ successModalBtnLabel: btnLabel }),
    setSuccessModalClickEvent: (clickEvent) =>
      set({ successModalClickEvent: clickEvent }),
    setOpenSuccessModal: (text, btnLable, clickEvent) =>
      set({
        isSuccessModal: true,
        successModalText: text,
        successModalBtnLabel: btnLable,
        successModalClickEvent: clickEvent,
      }),
    resetSuccessModal: () =>
      set({
        isSuccessModal: defaultIsOpen,
        successModalText: defaultText,
        successModalClickEvent: defaultClickEvent,
        successModalBtnLabel: defaultBtnLabel,
      }),
  }))
);

export default useSuccessModalStore;
