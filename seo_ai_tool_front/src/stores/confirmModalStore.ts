import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ConfirmModalStore = {
  isConfirmModal: boolean;
  confirmModalTitle: string;
  confirmModalText: string;
  confirmModalOnYes?: () => void;
  confirmModalOnNo?: () => void;
  confirmModalYesLabel: string;
  confirmModalNoLabel: string;
  confirmModalWidth: string;
  openSingleConfirm: (
    title: string,
    text: string,
    onYes: () => void,
    btnLabel?: string,
    width?: string
  ) => void;
  openConfirm: (
    title: string,
    text: string,
    onYes: () => void,
    onNo: () => void,
    yesBtnLabel?: string,
    noBtnLabel?: string,
    width?: string
  ) => void;
  resetConfirmModal: () => void;
};

const defaultIsOpen = false;
const defaultTitle = "";
const defaultText = "";
const defaultYesLabel = "";
const defaultNoLabel = "";
const defaultWidth = "";
const defaultOnYes = undefined;
const defaultOnNo = undefined;
const useConfirmModalStore = create<ConfirmModalStore>()(
  devtools((set) => ({
    isConfirmModal: defaultIsOpen,
    confirmModalTitle: defaultTitle,
    confirmModalText: defaultText,
    confirmModalOnYes: defaultOnYes,
    confirmModalOnNo: defaultOnNo,
    confirmModalYesLabel: defaultYesLabel,
    confirmModalNoLabel: defaultNoLabel,
    confirmModalWidth: defaultWidth,
    openSingleConfirm: (title, text, onYes, btnLabel = "OK", width = "30%") =>
      set({
        isConfirmModal: true,
        confirmModalTitle: title,
        confirmModalText: text,
        confirmModalYesLabel: btnLabel,
        confirmModalOnYes: onYes,
        confirmModalWidth: width,
      }),
    openConfirm: (
      title,
      text,
      onYes,
      onNo,
      yesbtnLabel = "Yes",
      nobtnLabel = "No",
      width = "30%"
    ) =>
      set({
        isConfirmModal: true,
        confirmModalTitle: title,
        confirmModalText: text,
        confirmModalYesLabel: yesbtnLabel,
        confirmModalNoLabel: nobtnLabel,
        confirmModalOnYes: onYes,
        confirmModalOnNo: onNo,
        confirmModalWidth: width,
      }),
    resetConfirmModal: () =>
      set({
        isConfirmModal: false,
        confirmModalTitle: defaultTitle,
        confirmModalText: defaultText,
        confirmModalOnYes: defaultOnYes,
        confirmModalOnNo: defaultOnNo,
        confirmModalYesLabel: defaultYesLabel,
        confirmModalNoLabel: defaultNoLabel,
        confirmModalWidth: defaultWidth,
      }),
  }))
);

export default useConfirmModalStore;
