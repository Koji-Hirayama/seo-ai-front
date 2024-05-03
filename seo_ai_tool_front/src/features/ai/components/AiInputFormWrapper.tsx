import FormSelectBoxField from "@/components/form/fields/FormSelectBoxField";
import Form from "@/components/form/Form";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import InputScrapingPrompt from "./InputScrapingPrompt";
import InputTableOutputExample from "./InputTableOutputExample";
import FormButton from "@/components/form/fields/FormButton";
import { AiModel, AiTypeAiInput } from "@/types/modelTypes";

type AiInputFormWrapperProps<TFormData extends FieldValues> = {
  methods: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
  aiModels: AiModel[];
  aiTypeAiInputs: AiTypeAiInput[];
};
const AiInputFormWrapper = <TFormData extends FieldValues>({
  methods,
  onSubmit,
  aiModels,
  aiTypeAiInputs,
}: AiInputFormWrapperProps<TFormData>) => {
  return (
    <Form useFormMethods={methods} onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="bg-white rounded-radius1 shadow-md p-2">
          <FormSelectBoxField
            name="llm"
            label="LLM"
            options={aiModels.filter((x) => x.ai_model_type?.name === "LLM")}
            optionLabelKey={"name"}
          />
        </div>
        {aiTypeAiInputs.map((aiTypeAiInput) => (
          <React.Fragment key={aiTypeAiInput.order}>
            {aiTypeAiInput.ai_input?.ai_input_fields && (
              <>
                {/* スクレイピング */}
                {aiTypeAiInput.ai_input?.ai_input_type?.name ===
                  "ScrapingPrompt" && (
                  <InputScrapingPrompt
                    aiInputFields={aiTypeAiInput.ai_input.ai_input_fields}
                  />
                )}
                {/* テーブル作成 */}
                {aiTypeAiInput.ai_input?.ai_input_type?.name ===
                  "TableOutputExample" && <InputTableOutputExample />}
              </>
            )}
          </React.Fragment>
        ))}
        <FormButton
          text="AI生成"
          width="50%"
          isValid={methods.formState.isValid}
        />
      </div>
    </Form>
  );
};

export default AiInputFormWrapper;
