import React, { ForwardRefRenderFunction } from "react";
import { Noop } from "react-hook-form";
import Button from "./Button";
import { FaTrashAlt } from "react-icons/fa";

type TextareaFieldProps = {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | Noop;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number | readonly string[];
  rows?: number;
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
const TextareaField: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaFieldProps
> = (
  {
    placeholder,
    disabled,
    name,
    onBlur,
    onChange,
    value,
    rows = 3,
    setButton,
    setFailureButton,
    ...rest
  }: TextareaFieldProps,
  ref
) => {
  return (
    <div className="flex items-start">
      <textarea
        rows={rows}
        className="px-3 py-2 text-sm w-full rounded-radius1 border border-gray-200 outline-none focus:border-color1-1"
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        value={value}
        {...rest}
      />
      <div className="flex items-center">
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
    </div>
  );
};

export default React.forwardRef(TextareaField);
