import React from "react";
type LoadingInlineProps = {
  text?: string;
  textSize?: string;
  width?: string;
  lodingIconSize?: string;
  lodingIconBorderSize?: string;
  lodingIconSpace?: string;
};
const LoadingInline = ({
  text = "",
  textSize = "12px",
  width = "150px",
  lodingIconSize = "20px",
  lodingIconBorderSize = "2px",
  lodingIconSpace = "10px",
}: LoadingInlineProps) => {
  return (
    <div
      style={{ width: width }}
      className="bg-gray-50 w-[140px] p-2 rounded-radius1 shadow-md text-center mt-1"
    >
      <div className="flex items-center justify-center">
        <div
          style={{
            width: lodingIconSize,
            height: lodingIconSize,
            borderWidth: lodingIconBorderSize,
          }}
          className="rounded-radius1 border-color1-1 animate-spin"
        ></div>
        <div
          style={{
            width: lodingIconSize,
            height: lodingIconSize,
            borderWidth: lodingIconBorderSize,
            marginLeft: lodingIconSpace,
            marginRight: lodingIconSpace,
          }}
          className="rounded-radius1 border-color1-1 animate-spin [animation-delay:-0.15s]"
        ></div>
        <div
          style={{
            width: lodingIconSize,
            height: lodingIconSize,
            borderWidth: lodingIconBorderSize,
          }}
          className="rounded-radius1 border-color1-1 animate-spin [animation-delay:-0.3s]"
        ></div>
      </div>
      <span
        style={{ fontSize: textSize }}
        className="font-medium text-textColor3"
      >
        {text}
      </span>
    </div>
  );
};

export default LoadingInline;
