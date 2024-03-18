import ErrorAlert from "@/components/alerts/ErrorAlert";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type FormLongTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  isNotRequired?: boolean;
};

const FormLongTextField = ({
  name,
  label,
  placeholder = "",
  rows = 4,
  isNotRequired = false,
}: FormLongTextFieldProps) => {
  // useFormContextからcontrolオブジェクトを取得
  const { control } = useFormContext();
  return (
    <div className="grid gap-2">
      <label className="text-[14px] font-medium text-textColor3">
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
            <textarea
              rows={rows}
              className="px-3 py-2 text-sm w-full rounded-radius1 border border-gray-200 outline-none focus:border-color1-1"
              placeholder={placeholder}
              disabled={field.disabled}
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
              value={field.value}
            ></textarea>
            {error?.message && <ErrorAlert messages={[error.message]} />}
          </>
        )}
      />
    </div>
  );
};

export default FormLongTextField;
