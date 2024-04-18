import { useAxiosResponseError } from "@/hooks/useError";
import React, { useRef, useState } from "react";
import { useMutateAiResponse } from "../hooks/useMutateAiResponse";
import { aiPromptValidation } from "../utils/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import { AiModel } from "@/types/modelTypes";
import useLoadingModalStore from "@/stores/loadingModalStore";
import {
  AiOutputExampleTableTieldType,
  Output,
  RequestAi,
  RequestPrompt,
  RequestScrapingResults,
  Table,
  TableRow,
  ExampleTableRow,
  RequestScrapingPromptMessage,
  ErrorOutput,
  OutputCategory,
} from "../types";
import useParamsStore from "@/stores/paramsStore";
import { AxiosError } from "axios";
import FormButton from "@/components/form/fields/FormButton";
import FormSelectBoxField from "@/components/form/fields/FormSelectBoxField";
import FormLongTextField from "@/components/form/fields/FormLongTextField";
import Form from "@/components/form/Form";
import FormAiOutputExampleTable from "@/components/form/fields/tabularFields/FormAiOutputExampleTable";
import FormArrayShortTextField from "@/components/form/fields/tabularFields/FormArrayShortTextField";
import { useMutateScrapingResults } from "../hooks/useMutateScrapingResults";
import OutputTable from "./OutputTable";
import OutputSimpleTable from "./OutputSimpleTable";
import ResizableDraggableDoubleWindow from "../../../components/windows/ResizableDraggableDoubleWindow";
import TabSwitcherWindow from "../../../components/windows/TabSwitcherWindow";
import { useMutateScrapingPromptMessage } from "../hooks/useMutateScrapingPromptMessage";
import ErrorOutputTable from "./ErrorOutputTable";
import LoadingInline from "@/components/loadings/LoadingInline";

type SimpleAiProps = {
  aiModels: AiModel[];
};

const SimpleAi = ({ aiModels }: SimpleAiProps) => {
  console.log("SimpleAi");
  const { openLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setError } = useAxiosResponseError();
  const aiResponseMutation = useMutateAiResponse();
  const scrapingResultsMutation = useMutateScrapingResults();
  const promptMessageMutation = useMutateScrapingPromptMessage();
  const { projectId, taskId } = useParamsStore();
  const [outputs, setOutputs] = useState<Output[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTabKey, setActiveTabKey] = useState("");

  const { simpleSchema } = aiPromptValidation();
  type ContactFormData = yup.InferType<typeof simpleSchema>;
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(simpleSchema),
    mode: "all",
    defaultValues: {
      llm: aiModels.find((option) => option.name === "gpt-3.5-turbo-1106"),
      urls: ["https://stlassh.com/method/"],
      input: "脱毛に関する強みを10パターン作成してください。",
      table_description: "強み・特徴を作成する",
      table: [
        {
          key: "content",
          type: { fieldType: "str" } as AiOutputExampleTableTieldType,
          description: "訴求文",
          examples: ["最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用"],
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    openLoadingModal("AI生成中です");
    const keys: TableRow[] = [];
    if (data.table !== undefined) {
      for (const item of data.table as ExampleTableRow[]) {
        const row: TableRow = {
          key: item.key,
          type: item.type.fieldType,
          description: item.description,
          examples: item.examples,
        };
        keys.push(row);
      }
    }
    const table: Table = {
      keys: keys,
    };
    const ai_model: AiModel = data.llm as AiModel;
    const requestPrompt: RequestPrompt = {
      urls: data.urls,
      input: data.input,
      output_example_model_description: data.table_description,
      output_example_model: table,
      task_id: taskId as number,
      ai_model_id: ai_model.id,
    };
    const from: RequestAi = {
      project_id: projectId as number,
      prompt: requestPrompt,
    };
    console.log("from", from);
    const prompt = createLoadingOutput("あなた", "2", "prompt");
    const output = createLoadingOutput("AI", "2", "output");
    await aiResponseMutation
      .mutateAsync(from)
      .then((res) => {
        console.log("AI完了", res);
        prompt.datas = [{ prompt: res.prompt.prompt }];
        updateSuccessOutput(prompt);

        if (res.prompt_output.is_error) {
          output.answerer = "AIError";
          output.datas = [res.prompt_output.output_model];
          output.outputCategory = "error";
          updateSuccessOutput(output);
        } else {
          output.datas = res.prompt_output.output_model["datas"];
          updateSuccessOutput(output);
        }
      })
      .catch((error: AxiosError) => {
        setError(error, "AI生成に失敗しました。", "閉じる");
      })
      .finally(resetLoadingModal);
  };

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
    };
    const res = await promptMessageMutation.mutateAsync(requestInput);
    console.log(res);
    output.datas = [res];
    updateSuccessOutput(output);
  };

  const createLoadingOutput = (
    answerer: string,
    tabCategory: string,
    outputCategory: OutputCategory
  ): Output => {
    setActiveTabKey(tabCategory);
    onAutoScroll();
    const output: Output = {
      id: `${answerer}${Math.floor(Math.random() * 1000)}`,
      answerer: answerer,
      status: "loading",
      datas: [],
      tabCategory: tabCategory,
      outputCategory: outputCategory,
    };
    setOutputs((currentOutputs) => [...currentOutputs, output]);
    return output;
  };

  const updateSuccessOutput = (updateOutput: Output) => {
    setOutputs((currentOutputs) =>
      currentOutputs.map((output) =>
        output.id === updateOutput.id
          ? {
              ...output,
              answerer: updateOutput.answerer,
              datas: updateOutput.datas,
              status: "success",
              tabCategory: updateOutput.tabCategory,
              outputCategory: updateOutput.outputCategory,
            }
          : output
      )
    );
  };

  const getTabOutputs = (tabKey: string) => {
    if (tabKey === "all") {
      return outputs;
    } else {
      return outputs.filter((x) => x.tabCategory === tabKey);
    }
  };

  const onAutoScroll = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <ResizableDraggableDoubleWindow
      defaultWidthPercentage={"0.6"}
      minWidth={500}
      leftChildren={
        <div className="mt-5 px-2 mb-20">
          <Form useFormMethods={methods} onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="bg-white rounded-radius1 shadow-md p-2">
                <FormSelectBoxField
                  name="llm"
                  label="LLM"
                  options={aiModels.filter(
                    (x) => x.ai_model_type?.name === "LLM"
                  )}
                  optionLabelKey={"name"}
                />
              </div>
              <div className="bg-white rounded-radius1 shadow-md p-2">
                <FormArrayShortTextField
                  tableSchemaName="urls"
                  label="URL(スクレイピング情報収集します)"
                  placeholder="webサイトのURLを入力"
                  setElementButton={{
                    btnText: "確認",
                    width: "80px",
                    onClick: (value) => {
                      onScraping([value] as string[]);
                    },
                  }}
                />
              </div>
              <div className="bg-white rounded-radius1 shadow-md p-2">
                <FormLongTextField
                  name="input"
                  label="収集した情報で何がしたいですか？"
                  onChange={(e) => {}}
                  setButton={{
                    btnText: "確認",
                    width: "80px",
                    onClick: (value) => {
                      onPrompt(String(value), methods.getValues().urls);
                    },
                  }}
                />
              </div>
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
              <FormButton
                text="AI生成"
                width="50%"
                isValid={methods.formState.isValid}
              />
            </div>
          </Form>
        </div>
      }
      rightChildren={
        <div className="mt-5 px-2 mb-36" ref={scrollRef}>
          <TabSwitcherWindow
            defaultTabKey={"1"}
            tabKyeValues={[
              { key: "1", value: "前処理" },
              { key: "2", value: "AI入出力結果" },
              { key: "all", value: "全て" },
            ]}
            activeTabKey={activeTabKey}
            setActiveTabKey={setActiveTabKey}
            children={(tab) => {
              return (
                <>
                  <div className="grid gap-6">
                    {getTabOutputs(tab.key)
                      ?.reverse()
                      .map((output, index) => (
                        <div key={index} className="grid gap-1">
                          <span
                            className={`text-sm ${
                              output.outputCategory === "error" &&
                              "text-failure-1 font-semibold"
                            }`}
                          >
                            {output.answerer}
                          </span>
                          {output.status === "loading" ? (
                            <LoadingInline
                              text="AIが頑張ってます。"
                              width="140px"
                            />
                          ) : (
                            <>
                              {output.outputCategory === "scraping" && (
                                <OutputSimpleTable datas={output.datas} />
                              )}
                              {(output.outputCategory === "prompt" ||
                                output.outputCategory === "output") && (
                                <OutputTable datas={output.datas} />
                              )}
                              {output.outputCategory === "error" && (
                                <ErrorOutputTable
                                  error_output={
                                    { error: output.datas[0] } as ErrorOutput
                                  }
                                />
                              )}
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </>
              );
            }}
          />
        </div>
      }
    />
  );
};

export default SimpleAi;
