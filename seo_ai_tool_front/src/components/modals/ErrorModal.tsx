import React from "react";
import ConfirmModal from "./ConfirmModal";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ErrorModalProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  title?: string;
  text?: string;
  errorResData?: object;
  width?: string;
  btnLabel?: string;
};

const ErrorModal = ({
  isOpen,
  onClick,
  onClose,
  title = "Error",
  text = "",
  errorResData = undefined,
  width = "35%",
  btnLabel = "Close",
}: ErrorModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onNo={onClick}
      noLabel={btnLabel}
      width={width}
    >
      <div className="flex flex-col items-center">
        <IoIosCloseCircleOutline className="w-[80px] h-[80px] text-failure-1" />
        <p className="text-[16px] text-failure-1 font-bold">{title}</p>
        {text && <p className="mt-3 text-[12px] font-medium">{text}</p>}
        {errorResData && (
          <div className="mt-4 text-textColor1 grid gap-y-1">
            <p className="text-[12px] font-medium">Error Details</p>
            <pre className="text-left bg-slate-200 px-2 py-1 rounded-radius1">
              <code className="text-[10px]">
                {JSON.stringify(errorResData, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
    </ConfirmModal>
  );
};

export default ErrorModal;
