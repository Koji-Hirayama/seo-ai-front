import ErrorAlert from "@/components/alerts/ErrorAlert";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type FormShortTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  isNotRequired?: boolean;
};

const FormShortTextField = ({
  name,
  label,
  placeholder = "",
  isNotRequired = false,
}: FormShortTextFieldProps) => {
  // useFormContextからcontrolオブジェクトを取得
  const { control } = useFormContext();
  return (
    <div className="grid gap-2">
      <label className="block font-medium text-[14px] text-textColor3">
        {label}
        {isNotRequired && (
          <span className="bg-gray-400 rounded-full px-3 py-1 text-[12px] text-white font-semibold ml-3">
            任意
          </span>
        )}
      </label>
      <Controller
        name={name}
        control={control} // Yupで定義された検証ルール
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              className="w-full text-sm bg-white border-gray-200 border rounded-radius1 px-3 py-2 outline-none focus:border-color1-1 autofill:none"
              placeholder={placeholder}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
              value={field.value}
            />
            {error?.message && <ErrorAlert messages={[error.message]} />}
          </>
        )}
      />
    </div>
  );
};

export default FormShortTextField;
