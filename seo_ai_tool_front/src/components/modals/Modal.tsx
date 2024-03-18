import React from "react";
import Overlay from "../overlays/Overlay";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  width: "25%" | "30%" | "40%" | "50%";
  onClose?: () => void;
  isCloseButton?: boolean;
};
const Modal = ({
  children,
  isOpen,
  width,
  onClose = undefined,
  isCloseButton = false,
}: ModalProps) => {
  // モーダルコンテンツのクリックイベントが自身のレイヤー以下に伝播しないようにするハンドラー
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // イベントの伝播を停止
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className={`w-[${width}] max-h-full animate-slideInBckTop`}>
        <div className="py-10">
          {isCloseButton && (
            <button
              type="button"
              className="float-right mr-5 mt-3"
              onClick={() => onClose?.()}
            >
              <IoClose className="w-[25px] h-[25px] text-textColor3" />
            </button>
          )}
          <div
            className="bg-white rounded-radius1 shadow-lg px-10 py-7"
            onClick={handleModalContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Modal;
