import FormLongTextField from "@/components/form/fields/FormLongTextField";
import FormArrayShortTextField from "@/components/form/fields/tabularFields/FormArrayShortTextField";
import { AiInputField } from "@/types/modelTypes";
import React from "react";
import { RequestScrapingPromptMessage, RequestScrapingResults } from "../types";
import useTaskAiStore from "../stores/taskAiStore";
import { useMutateScrapingResults } from "../hooks/useMutateScrapingResults";
import { useMutateScrapingPromptMessage } from "../hooks/useMutateScrapingPromptMessage";
import { useFormContext, useWatch } from "react-hook-form";

type InputScrapingPromptProps = {
  aiInputFields: AiInputField[];
  onArrayShortTextFieldClick?: (value: string) => void;
  onLongTextFieldClick?: (value: string) => void;
};
const InputScrapingPrompt = ({
  aiInputFields,
  onArrayShortTextFieldClick,
  onLongTextFieldClick,
}: InputScrapingPromptProps) => {
  const { createLoadingOutput, updateSuccessOutput } = useTaskAiStore();
  const scrapingResultsMutation = useMutateScrapingResults();
  const promptMessageMutation = useMutateScrapingPromptMessage();
  const { control } = useFormContext();
  const urls: string[] = useWatch({
    control,
    name: "urls",
  });

  const onScraping = async (urls: string[]) => {
    const output = createLoadingOutput("web解析AI", "1", "scraping");
    const requestUrls: RequestScrapingResults = { urls: urls };
    const res = await scrapingResultsMutation.mutateAsync(requestUrls);
    output.datas = res;
    updateSuccessOutput(output);
  };

  const onPrompt = async (input: string, urls: string[]) => {
    const output = createLoadingOutput("あなた", "1", "prompt");
    const requestInput: RequestScrapingPromptMessage = {
      input: input,
      urls: urls,
      ai_input_field_id: aiInputFields[1].id,
    };
    const res = await promptMessageMutation.mutateAsync(requestInput);
    console.log(res);
    output.datas = [res];
    updateSuccessOutput(output);
  };
  const createScrapingPromptContext = (): String => {
    return "";
  };
  return (
    <>
      <div className="bg-white rounded-radius1 shadow-md p-2">
        <FormArrayShortTextField
          tableSchemaName="urls"
          label={aiInputFields[0].question}
          placeholder="webサイトのURLを入力"
          setElementButton={{
            btnText: "確認",
            width: "80px",
            onClick: (value) => {
              onScraping([value] as string[]);
              onArrayShortTextFieldClick?.(value as string);
            },
          }}
        />
      </div>
      <div className="bg-white rounded-radius1 shadow-md p-2">
        <FormLongTextField
          name="promptInput"
          label={aiInputFields[1].question}
          onChange={(e) => {}}
          setButton={{
            btnText: "確認",
            width: "80px",
            onClick: (value) => {
              onPrompt(String(value), urls);
              onLongTextFieldClick?.(String(value));
            },
          }}
        />
      </div>
    </>
  );
};

export default InputScrapingPrompt;
