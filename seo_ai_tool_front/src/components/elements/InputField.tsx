import React, { ForwardRefRenderFunction } from "react";
import { Noop } from "react-hook-form";
import Button from "./Button";
import { FaTrashAlt } from "react-icons/fa";

type InputFieldProps = {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | Noop;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  setButton?: {
    btnText: string;
    onClick: (value: string | number | readonly string[] | undefined) => void;
    width?: string;
    textSize?: string;
  };
  setFailureButton?: {
    btnText: string;
    onClick: (value: string | number | readonly string[] | undefined) => void;
    width?: string;
    textSize?: string;
    isValid?: boolean;
  };
};
const InputField: ForwardRefRenderFunction<
  HTMLInputElement,
  InputFieldProps
> = (
  {
    placeholder,
    disabled,
    name,
    onBlur,
    onChange,
    value,
    setButton,
    setFailureButton,
    ...rest
  }: InputFieldProps,
  ref
) => {
  return (
    <div className="flex items-center">
      <input
        className="w-full text-sm bg-white border-gray-200 border rounded-radius1 px-3 py-2 outline-none focus:border-color1-1 autofill:none"
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        value={value}
        {...rest}
      />
      {setButton && (
        <div className="ml-1">
          <Button
            text={setButton.btnText}
            type="button"
            width={setButton.width === undefined ? "80px" : setButton.width}
            textSize={
              setButton.width === undefined ? "14px" : setButton.textSize
            }
            onClick={() => setButton.onClick(value)}
            isValid={!!value}
          />
        </div>
      )}
      {setFailureButton && (
        <div className="ml-1">
          <button
            style={{
              width:
                setFailureButton.width === undefined
                  ? "80px"
                  : setFailureButton.width,
              fontSize:
                setFailureButton.textSize === undefined
                  ? "14px"
                  : setFailureButton.textSize,
            }}
            className={`flex items-center justify-center text-[12px] text-failure-1 font-semibold ${
              setFailureButton.isValid === false && "opacity-50"
            }`}
            type="button"
            onClick={() => setFailureButton.onClick(value)}
            disabled={
              setFailureButton.isValid === undefined
                ? true
                : !setFailureButton.isValid
            }
          >
            <FaTrashAlt className="mr-1" />
            {setFailureButton.btnText}
          </button>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(InputField);
