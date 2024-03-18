import ErrorAlert from "@/components/alerts/ErrorAlert";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select, { Options } from "react-select";

type FormSelectBoxFieldProps<T> = {
  name: string;
  label: string;
  options: T[];
  optionLabelKey: keyof T;
  placeholder?: string;
  isNotRequired?: boolean;
};

const FormSelectBoxField = <T,>({
  name,
  label,
  options,
  optionLabelKey,
  placeholder = "",
  isNotRequired = false,
}: FormSelectBoxFieldProps<T>) => {
  // useFormContextからcontrolオブジェクトを取得
  const { control } = useFormContext();
  // options プロップからセレクトボックスの options を生成
  const selectOptions = options.map((option) => ({
    label: String(option[optionLabelKey]),
    value: option,
  }));
  // react-selectのスタイルカスタマイズ
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      // 枠線の太さ
      borderWidth: "1px",
      borderRadius: "8px",
      // Tailwind CSSのgray-200相当 : CSSのsky-500相当
      borderColor: state.isFocused ? "#0ea5e9" : "#e5e7eb",
      boxShadow: "none",
      //   color: "#d1d5db",
      padding: "3px",
      "&:hover": {
        cursor: "pointer",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "8px",
      backgroundColor: state.isSelected ? "#e5e7eb" : "white",
      color: "black",
      margin: "4px 0px",
      "&:hover": {
        cursor: "pointer",
      },
      "&:active": {
        backgroundColor: "#e5e7eb",
      },
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white",
      padding: "2px 6px",
      // 枠線の太さ
      borderRadius: "8px",
      boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.3)",
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

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
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              styles={customStyles}
              {...field}
              options={selectOptions}
              isSearchable={false}
              // react-selectに適合する形で値を設定
              value={selectOptions.find(
                (option) => option.value === field.value
              )}
              // RHFのonChangeに合わせてreact-selectの値を更新
              onChange={(option) => field.onChange(option?.value)}
              className="text-sm"
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
