import React, { ForwardRefRenderFunction } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { Noop } from "react-hook-form";

type OptionType<T> = {
  label: string;
  value: T;
};
type SelectBoxFieldProps<T> = {
  options: T[];
  optionLabelKey: keyof T;
  name?: string;
  placeholder?: string;
  isSearchable?: boolean;
  value?: T;
  defaultValue?: T;
  onChange?: (
    newValue: SingleValue<OptionType<T>>,
    actionMeta: ActionMeta<OptionType<T>>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | Noop;
};
const SelectBoxField = <T,>({
  name,
  options,
  optionLabelKey,
  value,
  defaultValue,
  isSearchable = false,
  placeholder = "",
  onChange,
  onBlur,
}: SelectBoxFieldProps<T>) => {
  const selectOptions: OptionType<T>[] = options.map((option) => ({
    label: String(option[optionLabelKey]),
    value: option,
  }));
  const defaultOption: OptionType<T> | undefined = defaultValue
    ? {
        label: String(defaultValue[optionLabelKey]),
        value: defaultValue,
      }
    : undefined;
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
    <>
      <Select
        name={name}
        styles={customStyles}
        options={selectOptions}
        isSearchable={isSearchable}
        value={selectOptions.find((option) => option.value === value)}
        defaultValue={defaultOption}
        onChange={onChange}
        onBlur={onBlur}
        className="text-sm"
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectBoxField;
