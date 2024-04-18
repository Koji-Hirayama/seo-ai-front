import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import FormShortTextField from "../FormShortTextField";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import Button from "@/components/elements/Button";

type FormArrayShortTextFieldProps = {
  tableSchemaName: string;
  label?: string;
  isNotRequired?: boolean;
  placeholder?: string;
  errorTitle?: string;
  elementErrorTitle?: string;
  setElementButton?: {
    btnText: string;
    onClick: (value: string | number | readonly string[] | undefined) => void;
    width?: string;
    textSize?: string;
  };
};

const FormArrayShortTextField = ({
  tableSchemaName,
  label = "",
  isNotRequired = false,
  placeholder = "",
  errorTitle = "",
  elementErrorTitle = "",
  setElementButton,
}: FormArrayShortTextFieldProps) => {
  const {
    control,
    watch,
    setError,
    formState: { errors }, //TODO: error処理実装する
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: tableSchemaName,
    control: control,
  });

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
        name={tableSchemaName}
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            {error?.message && (
              <ErrorAlert title={errorTitle} messages={[error.message]} />
            )}
          </>
        )}
      />
      <div className="grid gap-[4px]">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <FormShortTextField
                name={`${tableSchemaName}[${index}]`}
                placeholder={placeholder}
                errorTitle={elementErrorTitle}
                setButton={setElementButton}
                setFailureButton={{
                  btnText: "削除",
                  onClick: (value) => {
                    remove(index);
                  },
                  width: "47px",
                  textSize: "12px",
                  isValid: fields.length != 1,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="flex text-[12px] text-textColor3 items-center font-semibold p-1"
          onClick={() => {
            const fieldValue: string[] = watch(tableSchemaName);
            if (fieldValue && fieldValue[fieldValue.length - 1] == "") {
              // フィールドの最後が空文字の要素がある場合の処理
              setError(`${tableSchemaName}[${fieldValue.length - 1}]`, {
                type: "manual",
                message: "未入力の項目があります。",
              });
            } else {
              append("");
            }
          }}
        >
          <IoAddCircleSharp className="text-[18px] mr-1" />
          追加
        </button>
      </div>
    </div>
  );
};

export default FormArrayShortTextField;
