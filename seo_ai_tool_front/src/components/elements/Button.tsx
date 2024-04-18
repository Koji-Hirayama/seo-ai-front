import React, { useEffect, useState } from "react";

type ButtonProps = {
  text: string;
  type: "button" | "reset" | "submit";
  color?: "primary" | "failure";
  width?: string;
  textSize?: string;
  isValid?: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  type,
  color = "primary",
  width = "50%",
  textSize = "14px",
  isValid = true,
  onClick = undefined,
}: ButtonProps) => {
  const [colorClassName, setColorClassName] = useState("");

  useEffect(() => {
    if (color === "primary") {
      setColorClassName("bg-primary-1 hover:bg-primary-2");
    } else if (color === "failure") {
      setColorClassName("bg-failure-1 hover:bg-failure-2");
    }
  }, []);

  return (
    <div className="text-center">
      <button
        style={{ width: width, fontSize: textSize }}
        className={`text-white font-medium rounded-radius1 px-4 py-2 ${
          !isValid && "opacity-50"
        } ${colorClassName}`}
        type={type}
        disabled={!isValid}
        onClick={() => onClick?.()}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
