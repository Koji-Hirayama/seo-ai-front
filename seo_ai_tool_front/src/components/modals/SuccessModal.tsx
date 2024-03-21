import React from "react";
import ConfirmModal from "./ConfirmModal";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

type SuccessModalProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  text?: string;
  width?: string;
  btnLabel?: string;
};

const SuccessModal = ({
  isOpen,
  onClick,
  onClose,
  text = "Success",
  width = "25%",
  btnLabel = "Continue",
}: SuccessModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onYes={onClick}
      onClose={onClose}
      yesLabel={btnLabel}
      width={width}
    >
      <div className="flex flex-col items-center space-y-2">
        <IoCheckmarkCircleOutline className="w-[80px] h-[80px] text-primary-1" />
        <p className="text-[16px]">{text}</p>
      </div>
    </ConfirmModal>
  );
};

export default SuccessModal;
