import React from "react";
import { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
type FormTableProps = {
  children: React.ReactNode;
  useFormMethodControl: Control;
  tableSchemaName: string;
};
const FormTable = ({
  children,
  useFormMethodControl,
  tableSchemaName,
}: FormTableProps) => {
  const { fields, append, remove } = useFieldArray({
    name: tableSchemaName,
    control: useFormMethodControl,
  });
  return <></>;
};

export default FormTable;
