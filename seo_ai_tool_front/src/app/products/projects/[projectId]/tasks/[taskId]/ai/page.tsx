"use client";
import Form from "@/components/form/Form";
import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import React, { useEffect, useState } from "react";
import yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { aiPromptValidation } from "@/features/ai/utils/validation";
import {
  Control,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import FormShortTextField from "@/components/form/fields/FormShortTextField";
import FormButton from "@/components/form/fields/FormButton";
import { FormComponent } from "@/components/form/fields/tabularFields/FormComponent";
import FormComponent2 from "@/components/form/fields/tabularFields/FormComponent2";
import "@/components/form/fields/tabularFields/styles.css";
import FormLongTextField from "@/components/form/fields/FormLongTextField";
import { useMutateAiResponse } from "@/features/ai/hooks/useMutateAiResponse";
import { Prompt, RequestAi, Table, TableRow } from "@/features/ai/types";
import useParamsStore from "@/stores/paramsStore";
import useLoadingModalStore from "@/stores/loadingModalStore";
import { useAxiosResponseError } from "@/hooks/useError";
import { AxiosError } from "axios";

const Page = ({
  params,
}: {
  params: { projectId: number; taskId: number };
}) => {
  const [aiOutput, setAiOutput] = useState("AIが回答します。");
  const { setParams } = useParamsStore();
  const { openLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setError } = useAxiosResponseError();
  const aiResponseMutation = useMutateAiResponse();
  const { simpleSchema } = aiPromptValidation();
  type ContactFormData = yup.InferType<typeof simpleSchema>;
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(simpleSchema),
    mode: "onBlur",
    defaultValues: {
      url: "https://stlassh.com/method/",
      input: "脱毛に関する強みを10パターン作成してください。",
      table_input: "強み・特徴を作成する",
      table: [
        {
          key: "content",
          type: "str",
          description: "訴求文",
          examples: "最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用",
        },
      ],
    },
  });

  const control = methods.control;
  const { fields, append, remove } = useFieldArray({
    name: "table",
    control,
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    openLoadingModal("AI生成中です");
    console.log(data);
    const keys: TableRow[] = [];
    if (data.table !== undefined) {
      for (const item of data.table) {
        const row: TableRow = {
          key: item.key,
          type: item.type,
          description: item.description,
          examples: [item.examples],
        };
        keys.push(row);
      }
    }
    const table: Table = {
      keys: keys,
    };
    const prompt: Prompt = {
      url: data.url,
      input: data.input,
      input_table: data.table_input,
      output_example_table: table,
      work_id: 1,
      llm_id: 1,
    };
    const from: RequestAi = {
      project_id: params.projectId,
      prompt: prompt,
    };
    console.log("from", from);
    await aiResponseMutation
      .mutateAsync(from)
      .then((res) => {
        console.log("AI完了", res);
        setAiOutput(JSON.stringify(res.output_json.output, null, 2));
      })
      .catch((error: AxiosError) => {
        setError(error, "AI生成に失敗しました。", "閉じる");
      })
      .finally(resetLoadingModal);
  };

  //   const Total = ({ control }: { control: Control<ContactFormData> }) => {
  //     const formValues = useWatch({
  //       name: "cart"
  //       control,
  //     });
  //     if (formValues != undefined) {
  //       const total = formValues.reduce(
  //         (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
  //         0
  //       );
  //       return <p>Total Amount: {total}</p>;
  //     }
  //     return null;
  //   };

  useEffect(() => {
    // isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    setParams(params.projectId, params.taskId);
  }, []);
  return (
    <>
      <Header />
      {/* <Sidemenu /> */}
      <main className="relative">
        <div
        // className="ml-[200px]"
        >
          <div className="flex flex-row">
            <div className="w-2/3 px-2">
              <Form useFormMethods={methods} onSubmit={onSubmit}>
                <FormShortTextField
                  name="url"
                  label="URL(スクレイピング情報収集します)"
                />
                <FormLongTextField
                  name="input"
                  label="収集した情報で何がしたいですか？"
                />
                <FormShortTextField
                  name="table_input"
                  label="以下のテーブルの目的を教えてください。テーブルに具体的な例を入力すると精度が上がります"
                />
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className={"section"} key={field.id}>
                        <p>key</p>
                        <p>type</p>
                        <p>description</p>
                        <p>examples</p>
                        <p>行の削除</p>
                        <input
                          placeholder="name"
                          {...methods.register(`table.${index}.key` as const, {
                            required: true,
                          })}
                          className={
                            methods.formState.errors?.table?.[index]?.key
                              ? "error"
                              : ""
                          }
                          defaultValue={field.key}
                        />
                        <input
                          placeholder="quantity"
                          {...methods.register(`table.${index}.type` as const, {
                            required: true,
                          })}
                          className={
                            methods.formState.errors?.table?.[index]?.type
                              ? "error"
                              : ""
                          }
                          defaultValue={field.type}
                        />
                        <input
                          placeholder="value"
                          {...methods.register(
                            `table.${index}.description` as const,
                            {
                              required: true,
                            }
                          )}
                          className={
                            methods.formState.errors?.table?.[index]
                              ?.description
                              ? "error"
                              : ""
                          }
                          defaultValue={field.description}
                        />
                        <input
                          placeholder="value"
                          {...methods.register(
                            `table.${index}.examples` as const,
                            {
                              required: true,
                            }
                          )}
                          className={
                            methods.formState.errors?.table?.[index]?.examples
                              ? "error"
                              : ""
                          }
                          defaultValue={field.examples}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          DELETE
                        </button>
                      </section>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      key: "content",
                      type: "str",
                      description: "訴求文",
                      examples:
                        "最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用",
                    })
                  }
                >
                  APPEND
                </button>
                {/* <Total control={control} /> */}
                <FormButton
                  text="AI生成"
                  width="50%"
                  isValid={methods.formState.isValid}
                />
              </Form>
              {/* <FormComponent /> */}
              {/* <FormComponent2 /> */}
            </div>
            <div className="w-1/3 px-2 py-11">
              <div className="bg-white px-2 py-4 rounded-lg">
                <pre className="flex">
                  <code className="text-[12px]  whitespace-pre-wrap break-all">
                    {aiOutput}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
