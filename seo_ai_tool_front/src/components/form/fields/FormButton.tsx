import React from "react";

type FormButtonProps = {
  text: string;
  width?: string;
  isValid?: boolean;
};
const FormButton = ({
  text,
  width = "50%",
  isValid = false,
}: FormButtonProps) => {
  return (
    <div className="text-center">
      <button
        style={{ minWidth: width }}
        className={`btn1 ${!isValid && "opacity-50 bg-color1-2"}`}
        type="submit"
        disabled={!isValid}
      >
        {text}
      </button>
    </div>
  );
};

export default FormButton;
