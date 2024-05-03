import React from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import FormShortTextField from "../FormShortTextField";
import FormArrayShortTextField from "./FormArrayShortTextField";
import Button from "@/components/elements/Button";
import { FaTrashAlt } from "react-icons/fa";
import { getAiOutputExampleTableFieldTypes } from "@/features/ai/constants/aiOutputExampleTableFieldTypes";
import FormSelectBoxField from "../FormSelectBoxField";
import {
  AiOutputExampleTableTieldType,
  ExampleTableRow,
  TableDatas,
  TableSchema,
  TableSchemas,
} from "@/features/ai/types";
import ErrorAlert from "@/components/alerts/ErrorAlert";

type FormAiOutputExampleTableProps = {
  tableSchemaName: string;
  onSchemaConfirmationClick: (schema: TableSchemas) => void;
  onTableConfirmationClick: (table: TableDatas) => void;
};
const FormAiOutputExampleTable = ({
  tableSchemaName,
  onSchemaConfirmationClick,
  onTableConfirmationClick,
}: FormAiOutputExampleTableProps) => {
  const { control } = useFormContext();
  const fieldValue: ExampleTableRow[] = useWatch({
    control,
    name: tableSchemaName,
  }); // 特定のフィールドの値を監視
  const { fields, append, remove } = useFieldArray({
    name: tableSchemaName,
    control: control,
  });

  const onSchemaConfirmation = (): TableSchemas => {
    const datas: TableSchema[] = fieldValue.map(
      (item: ExampleTableRow): TableSchema => {
        return {
          key: item.key,
          type: item.type.fieldType,
          description: item.description,
          examples:
            "[" + item.examples.map((item) => `"${item}"`).join(", ") + "]",
        };
      }
    );
    return { datas: datas };
  };

  const onTableConfirmation = (): TableDatas => {
    const data = fieldValue.reduce<Record<string, any>>(
      (acc, { key, type, examples }) => {
        if (type.fieldType === "str") {
          acc[key] = examples[0]; // 文字列型の場合
        } else if (type.fieldType === "int") {
          acc[key] = parseInt(examples[0], 10); // 整数型の場合
        } else {
          acc[key] = examples[0]; // 文字列型
        }
        // 他の型も同様に処理を追加
        return acc;
      },
      {}
    );
    return { datas: [data] };
  };

  return (
    <div className="grid gap-3">
      <div className="">
        <FormShortTextField
          name="tableDescription"
          label="以下のテーブルの目的を教えてください。テーブルに具体的な例を入力すると精度が上がります"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex space-x-2">
          <Button
            type="button"
            text="フィールドを追加"
            onClick={() =>
              append({
                key: "content",
                type: { fieldType: "str" } as AiOutputExampleTableTieldType,
                description: "訴求文",
                examples: [
                  "最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用",
                ],
              })
            }
            width="160px"
            textSize="12px"
          />
          <Button
            type="button"
            text="スキーマ確認"
            onClick={() => {
              onSchemaConfirmationClick(onSchemaConfirmation());
            }}
            width="160px"
            textSize="12px"
          />
          <Button
            type="button"
            text="テーブル確認"
            onClick={() => {
              onTableConfirmationClick(onTableConfirmation());
            }}
            width="160px"
            textSize="12px"
          />
        </div>
        <Controller
          name={tableSchemaName}
          control={control}
          render={({ fieldState: { error } }) => (
            <>{error?.message && <ErrorAlert messages={[error.message]} />}</>
          )}
        />
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="grid gap-2 border-t-2 py-4">
              <div className="flex justify-end">
                <button
                  className={`flex items-center text-[12px] text-failure-1 font-semibold ${
                    fields.length == 1 && "opacity-50"
                  }`}
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length == 1}
                >
                  <FaTrashAlt className="mr-1" />
                  フィールド削除
                </button>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3 bg-white rounded-radius1 shadow-md p-2">
                  <FormSelectBoxField
                    name={`${tableSchemaName}.${index}.type`}
                    label="type"
                    options={getAiOutputExampleTableFieldTypes()}
                    optionLabelKey={"fieldType"}
                  />
                </div>
                <div className="col-span-3 bg-white rounded-radius1 shadow-md p-2">
                  <FormShortTextField
                    name={`${tableSchemaName}.${index}.key`}
                    label="key"
                  />
                </div>
                <div className="col-span-6 bg-white rounded-radius1 shadow-md p-2">
                  <FormShortTextField
                    name={`${tableSchemaName}.${index}.description`}
                    label="description"
                  />
                </div>
              </div>
              <div className="bg-white rounded-radius1 shadow-md p-2">
                <FormArrayShortTextField
                  label="examples"
                  tableSchemaName={`${tableSchemaName}.${index}.examples`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormAiOutputExampleTable;
