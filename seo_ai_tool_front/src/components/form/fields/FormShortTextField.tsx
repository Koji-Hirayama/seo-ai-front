import ErrorAlert from "@/components/alerts/ErrorAlert";
import InputField from "@/components/elements/InputField";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type FormShortTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  isNotRequired?: boolean;
  errorTitle?: string;
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

const FormShortTextField = ({
  name,
  label = "",
  placeholder = "",
  isNotRequired = false,
  errorTitle = "",
  setButton,
  setFailureButton,
}: FormShortTextFieldProps) => {
  // useFormContextからcontrolオブジェクトを取得
  const { control } = useFormContext();
  return (
    <div className="grid gap-2">
      {(label || isNotRequired) && (
        <div className="flex space-x-2">
          {label && (
            <label className="block font-medium text-[14px] text-textColor3">
              {label}
            </label>
          )}
          {isNotRequired && (
            <span className="w-[55px] bg-gray-400 rounded-full px-3 py-1 text-[12px] text-white font-semibold text-center">
              任意
            </span>
          )}
        </div>
      )}

      <Controller
        name={name}
        control={control} // Yupで定義された検証ルール
        render={({ field, fieldState: { error } }) => (
          <>
            <InputField
              placeholder={placeholder}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
              value={field.value}
              setButton={setButton}
              setFailureButton={setFailureButton}
            />

            {error?.message && (
              <ErrorAlert title={errorTitle} messages={[error.message]} />
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormShortTextField;
