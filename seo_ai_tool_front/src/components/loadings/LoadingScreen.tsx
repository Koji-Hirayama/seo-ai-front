import React from "react";
import LoadingElements from "./LoadingElements";

type LoadingScreenProps = {
  isOpen: boolean;
  label?: string;
};
const LoadingScreen = ({ isOpen, label = "" }: LoadingScreenProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
      <div className="flex justify-center items-center w-[25%] relative">
        <LoadingElements />
        <span className="absolute mt-4 text-center text-xl top-14 font-medium text-textColor3">
          {label}
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
