import React from "react";

type FormButton = {
  text: string;
  widthClass?: string;
  isValid?: boolean;
};
const FormButton = ({
  text,
  widthClass = "min-w-[50%]",
  isValid = false,
}: FormButton) => {
  return (
    <div className="text-center">
      <button
        className={`btn1 ${widthClass} ${!isValid && "opacity-50 bg-color1-2"}`}
        type="submit"
        disabled={!isValid}
      >
        {text}
      </button>
    </div>
  );
};

export default FormButton;
