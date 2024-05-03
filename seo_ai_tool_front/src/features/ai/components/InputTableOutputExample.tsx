import FormAiOutputExampleTable from "@/components/form/fields/tabularFields/FormAiOutputExampleTable";
import React from "react";
import useTaskAiStore from "../stores/taskAiStore";

const InputTableOutputExample = () => {
  const { createLoadingOutput, updateSuccessOutput } = useTaskAiStore();
  return (
    <>
      <div className="bg-white rounded-radius1 shadow-md p-2">
        <FormAiOutputExampleTable
          tableSchemaName="table"
          onSchemaConfirmationClick={(schema) => {
            const output = createLoadingOutput("other", "1", "output");
            output.datas = schema.datas;
            updateSuccessOutput(output);
          }}
          onTableConfirmationClick={(table) => {
            const output = createLoadingOutput("other", "1", "output");
            output.datas = table.datas;
            updateSuccessOutput(output);
          }}
        />
      </div>
    </>
  );
};

export default InputTableOutputExample;
