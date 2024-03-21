import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ErrorModalStore = {
  isErrorModal: boolean;
  errorModalTitle: string;
  errorModalText: string;
  errorModalResData: object | undefined;
  errorModalBtnLabel: string;
  errorModalClickEvent: () => void;
  setIsErrorModal: (isOpen: boolean) => void;
  setErrorModalTitle: (title: string) => void;
  setErrorModalText: (text: string) => void;
  setErrorModalResJson: (resData: object) => void;
  setErrorModalBtnLabel: (btnLabel: string) => void;
  setErrorModalClickEvent: (clickEvent: () => void) => void;
  setOpenErrorModal: (
    title: string,
    text: string,
    resData: object,
    clickEvent: () => void,
    btnLabel: string
  ) => void;
  resetErrorModal: () => void;
};

const defaultIsOpen = false;
const defaultTitle = "Error";
const defaultText = "";
const defaultResJson = undefined;
const defaultClickEvent = () => {};
const defaultBtnLabel = "Close";
const useErrorModalStore = create<ErrorModalStore>()(
  devtools((set) => ({
    isErrorModal: defaultIsOpen,
    errorModalTitle: defaultTitle,
    errorModalText: defaultText,
    errorModalResData: defaultResJson,
    errorModalBtnLabel: defaultBtnLabel,
    errorModalClickEvent: defaultClickEvent,
    setIsErrorModal: (isOpen) => set({ isErrorModal: isOpen }),
    setErrorModalTitle: (title) => set({ errorModalTitle: title }),
    setErrorModalText: (text) => set({ errorModalText: text }),
    setErrorModalResJson: (resData) => set({ errorModalResData: resData }),
    setErrorModalBtnLabel: (btnLabel) => set({ errorModalBtnLabel: btnLabel }),
    setErrorModalClickEvent: (clickEvent) =>
      set({ errorModalClickEvent: clickEvent }),
    setOpenErrorModal: (
      title: string,
      text: string,
      resData: object,
      clickEvent: () => void,
      btnLabel: string
    ) =>
      set({
        isErrorModal: true,
        errorModalTitle: title,
        errorModalText: text,
        errorModalResData: resData,
        errorModalClickEvent: clickEvent,
        errorModalBtnLabel: btnLabel,
      }),
    resetErrorModal: () =>
      set({
        isErrorModal: false,
        errorModalTitle: defaultTitle,
        errorModalText: defaultText,
        errorModalResData: defaultResJson,
        errorModalClickEvent: defaultClickEvent,
        errorModalBtnLabel: defaultBtnLabel,
      }),
  }))
);

export default useErrorModalStore;
