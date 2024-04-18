import ErrorAlert from "@/components/alerts/ErrorAlert";
import SelectBoxField from "@/components/elements/SelectBoxField";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type FormSelectBoxFieldProps<T> = {
  name: string;
  label?: string;
  options: T[];
  optionLabelKey: keyof T;
  placeholder?: string;
  isNotRequired?: boolean;
};

const FormSelectBoxField = <T,>({
  name,
  label = "",
  options,
  optionLabelKey,
  placeholder = "",
  isNotRequired = false,
}: FormSelectBoxFieldProps<T>) => {
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
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <SelectBoxField
              name={name}
              options={options}
              optionLabelKey={optionLabelKey}
              isSearchable={false}
              value={field.value}
              defaultValue={field.value}
              // RHFのonChangeに合わせてreact-selectの値を更新
              onChange={(option) => {
                field.onChange(option?.value);
              }}
              onBlur={field.onBlur}
              placeholder={placeholder}
            />
            {error?.message && <ErrorAlert messages={[error.message]} />}
          </>
        )}
      />
    </div>
  );
};

export default FormSelectBoxField;
