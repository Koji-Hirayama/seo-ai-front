import React from "react";
import Button from "../elements/Button";
import Modal from "./Modal";

type ConfirmModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onYes?: () => void;
  onNo?: () => void;
  yesLabel?: string;
  noLabel?: string;
  width?: string;
};

const ConfirmModal = ({
  children,
  isOpen,
  onClose,
  title = "",
  onYes = undefined,
  onNo = undefined,
  yesLabel = "はい",
  noLabel = "いいえ",
  width = "30%",
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} width={width}>
      <div className="flex flex-col justify-center items-center space-y-6 text-textColor3 text-center">
        {title && <p className="text-[16px] font-medium">{title}</p>}
        <div className="flex items-center min-h-[60px] text-sm font-medium">
          {children}
        </div>
        <div className="flex flex-row space-x-6">
          {onYes && (
            <Button
              width="120px"
              color="primary"
              text={yesLabel}
              type="button"
              onClick={() => {
                onYes();
                onClose();
              }}
            />
          )}
          {onNo && (
            <Button
              width="120px"
              color="failure"
              text={noLabel}
              type="button"
              onClick={() => {
                onNo();
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
