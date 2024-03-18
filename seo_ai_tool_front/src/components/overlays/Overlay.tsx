"use client";
import React, { useEffect } from "react";

type OverlayProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};
const Overlay = ({ children, isOpen, onClose = undefined }: OverlayProps) => {
  useEffect(() => {
    const handleScroll = (e: any) => {
      if (isOpen) {
        e.preventDefault();
      }
    };

    // モーダルが開いている間はスクロールを禁止
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll, { passive: false });
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("scroll", handleScroll, {
        passive: false,
      } as EventListenerOptions);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // オーバーレイ部分のクリックを検知するハンドラー
  const handleOverlayClick = (e: React.MouseEvent) => {
    onClose?.(); // オーバーレイをクリックしたときの処理
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 overflow-y-scroll animate-simpleFadeIn"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
