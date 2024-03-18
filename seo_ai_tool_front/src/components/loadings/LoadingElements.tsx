import React from "react";

const LoadingElements = () => {
  return (
    <div className="flex space-x-8 items-center justify-center w-full h-full">
      <div className="rounded-radius1 h-10 w-10 border-4 border-t-4 border-color1-1 animate-spin"></div>
      <div className="rounded-radius1 h-10 w-10 border-4 border-t-4 border-color1-1 animate-spin [animation-delay:-0.15s]"></div>
      <div className="rounded-radius1 h-10 w-10 border-4 border-t-4 border-color1-1 animate-spin [animation-delay:-0.3s]"></div>
    </div>
  );
};

export default LoadingElements;
