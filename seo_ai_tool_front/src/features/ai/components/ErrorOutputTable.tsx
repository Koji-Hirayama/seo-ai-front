import React from "react";
import { ErrorOutput } from "../types";
import OutputTable from "./OutputTable";

type ErrorOutputProps = {
  error_output: ErrorOutput;
};

const ErrorOutputTable = ({ error_output }: ErrorOutputProps) => {
  const createErrorDatas = () => {
    const datas = [
      { field: "code", message: error_output.error.code },
      { field: "error", message: error_output.error.error },
      { field: "status", message: error_output.error.status },
      { field: "message", message: error_output.error.message },
      { field: "error_type", message: error_output.error.error_type },
    ];
    if (error_output.error.error_details !== undefined) {
      for (const detail of error_output.error.error_details) {
        datas.push({ field: detail.field, message: detail.message });
      }
    }
    return datas;
  };
  return <OutputTable datas={createErrorDatas()} />;
};

export default ErrorOutputTable;
