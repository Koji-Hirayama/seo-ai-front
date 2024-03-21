import React, { useEffect, useState } from "react";
import Overlay from "../overlays/Overlay";
import { IoClose } from "react-icons/io5";
import { FadeInAnime } from "@/types";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  width?: string;
  onClose?: () => void;
  isCloseButton?: boolean;
  fadeInAnime?: FadeInAnime;
};
const Modal = ({
  children,
  isOpen,
  width = "50%",
  onClose = undefined,
  isCloseButton = false,
  fadeInAnime = "animate-slideInBckTop",
}: ModalProps) => {
  // モーダルコンテンツのクリックイベントが自身のレイヤー以下に伝播しないようにするハンドラー
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // イベントの伝播を停止
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div style={{ width: width }} className={`max-h-full ${fadeInAnime}`}>
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
            className="bg-white rounded-radius1 shadow-lg px-10 py-7 whitespace-pre-wrap"
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
