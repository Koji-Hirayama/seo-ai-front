import React from "react";
import LoadingElements from "./LoadingElements";
import Overlay from "../overlays/Overlay";

type LoadingScreenProps = {
  isLoading: boolean;
  label?: string;
};
const LoadingScreen = ({ isLoading, label = "" }: LoadingScreenProps) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
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
