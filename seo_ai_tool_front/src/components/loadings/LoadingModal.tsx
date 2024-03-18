import React from "react";
import Modal from "../modals/Modal";
import LoadingElements from "./LoadingElements";

type LoadingModalProps = {
  isOpen: boolean;
  label?: string;
};
const LoadingModal = ({ isOpen, label = "処理中です" }: LoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} width="25%">
      <div className="h-[60px]">
        <LoadingElements />
      </div>
      <span className="block mt-4 text-center text-xl font-medium text-textColor3">
        {label}
      </span>
    </Modal>
  );
};

export default LoadingModal;
