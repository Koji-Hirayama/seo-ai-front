import ResizableDraggableDoubleWindow from "@/components/windows/ResizableDraggableDoubleWindow";
import { AiModel, AiTypeAiInput } from "@/types/modelTypes";
import React, { useEffect, useRef, useState } from "react";
import { aiPromptValidation } from "../utils/validation";
import yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AiOutputExampleTableTieldType,
  ExampleTableRow,
  RequestAi,
  RequestPrompt,
  Table,
  TableRow,
} from "../types";
import useLoadingModalStore from "@/stores/loadingModalStore";
import { useAxiosResponseError } from "@/hooks/useError";
import useParamsStore from "@/stores/paramsStore";
import { AxiosError } from "axios";
import useTaskAiStore from "../stores/taskAiStore";
import AiInputFormWrapper from "./AiInputFormWrapper";
import AiOutputWrapper from "./AiOutputWrapper";
import { useMutateTaskAi } from "../hooks/useMutateTaskAi";

type TaskAiDirectorProps = {
  aiModels: AiModel[];
  aiTypeAiInputs: AiTypeAiInput[];
  aiTypeId: number;
};
const TaskAiDirector = ({
  aiModels,
  aiTypeAiInputs,
  aiTypeId,
}: TaskAiDirectorProps) => {
  const { projectId, taskId } = useParamsStore();
  const { openLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setError } = useAxiosResponseError();
  const taskAi = useMutateTaskAi();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTabKey, setActiveTabKey] = useState("");
  const { getOutputs, createLoadingOutput, updateSuccessOutput } =
    useTaskAiStore();
  const { simpleSchema, defaultSchemaValues } = aiPromptValidation(
    aiModels,
    aiTypeAiInputs
  );
  type ContactFormData = yup.InferType<typeof simpleSchema>;
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(simpleSchema),
    mode: "all",
    defaultValues: defaultSchemaValues,
    // {
    //   llm: aiModels.find((option) => option.name === "gpt-3.5-turbo-1106"),
    //   promptInput: "脱毛に関する強みを10パターン作成してください。",
    //   tableDescription: "強み・特徴を作成する",
    //   table: [
    //     {
    //       key: "content",
    //       type: { fieldType: "str" } as AiOutputExampleTableTieldType,
    //       description: "訴求文",
    //       examples: ["最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用"],
    //     },
    //   ],
    //   urls: ["https://stlassh.com/method/"],
    // },
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
      urls: data.urls as string[],
      prompt_user_input: data.promptInput as string,
      output_example_model_description: data.tableDescription as string,
      output_example_model: table,
      task_id: taskId as number,
      ai_model_id: ai_model.id,
      ai_type_id: aiTypeId,
    };
    const from: RequestAi = {
      project_id: projectId as number,
      prompt: requestPrompt,
    };
    console.log("from", from);
    const prompt = createLoadingOutput("あなた", "2", "prompt");
    const output = createLoadingOutput("AI", "2", "output");
    await taskAi
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

  const onAutoScroll = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onAutoScroll();
    if (getOutputs()[getOutputs().length - 1] !== undefined) {
      setActiveTabKey(getOutputs()[getOutputs().length - 1].tabCategory);
    }
  }, [getOutputs()]);

  return (
    <ResizableDraggableDoubleWindow
      defaultWidthPercentage={"0.6"}
      minWidth={500}
      leftChildren={
        <div className="mt-5 px-2 mb-20">
          <AiInputFormWrapper
            methods={methods}
            onSubmit={onSubmit}
            aiModels={aiModels}
            aiTypeAiInputs={aiTypeAiInputs}
          />
        </div>
      }
      rightChildren={
        <div className="mt-5 px-2 mb-36" ref={scrollRef}>
          <AiOutputWrapper
            activeTabKey={activeTabKey}
            setActiveTabKey={setActiveTabKey}
          />
        </div>
      }
    />
  );
};

export default TaskAiDirector;
