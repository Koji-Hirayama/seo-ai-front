import { AiTypeAiInput, AiModel } from "@/types/modelTypes";
import * as Yup from "yup";
import { AiOutputExampleTableTieldType } from "../types";

export const aiPromptValidation = (
  aiModels: AiModel[],
  aiTypeAiInputs: AiTypeAiInput[]
) => {
  const names: string[] = getInputTypeNames(aiTypeAiInputs);

  const simpleSchema = Yup.object().shape({
    llm: Yup.object().required("選択は必須です"),
    urls: urls(names, ["ScrapingPrompt"]),
    promptInput: promptInput(names, ["ScrapingPrompt"]),
    tableDescription: tableDescription(names, ["TableOutputExample"]),
    table: table(names, ["TableOutputExample"]),
  });

  type SchemaData = Yup.InferType<typeof simpleSchema>;
  const defaultLlm = aiModels.find(
    (option) => option.name === "gpt-3.5-turbo-1106"
  ) as AiModel;
  const defaultUrls: string[] = ["https://example.com"];
  const defaultPromptInput: string = "";
  const defaultTableDescription: string = "";
  const defaultTable: {
    key: string;
    type: {};
    description: string;
    examples: string[];
  }[] = [
    {
      key: "content",
      type: { fieldType: "str" } as AiOutputExampleTableTieldType,
      description: "訴求文",
      examples: ["最短60分の迅速施術と肌への負担を軽減するSHR脱毛採用"],
    },
  ];

  const defaultSchemaValues: SchemaData = {
    llm: defaultLlm,
    urls: defaultUrls,
    promptInput: defaultPromptInput,
    tableDescription: defaultTableDescription,
    table: defaultTable,
  };

  return { simpleSchema, defaultSchemaValues };
};

const getInputTypeNames = (aiTypeAiInputs: AiTypeAiInput[]): string[] => {
  let aiInputTypeNames: string[] = [];
  if (Array.isArray(aiTypeAiInputs)) {
    // ai_input_type の name を抽出して配列にする
    aiInputTypeNames = aiTypeAiInputs
      .map((aiTypeAiInput) => aiTypeAiInput?.ai_input?.ai_input_type?.name)
      .filter((name): name is string => name !== undefined); // undefined を除外
  }
  return aiInputTypeNames;
};

const isInputTypes = (
  inputTypeNames: string[],
  requiredInputTypeNames: string[]
): boolean => {
  return requiredInputTypeNames.some((type) => inputTypeNames.includes(type));
};

// 各keyの条件を、aiInputTypeNamesから決定する
// ============================================
// urlの入力欄の設定
const urls = (inputTypeNames: string[], requiredInputTypeNames: string[]) => {
  return isInputTypes(inputTypeNames, requiredInputTypeNames)
    ? Yup.array()
        .of(
          Yup.string()
            .max(500, "500文字以下にしてください。")
            .required("入力必須の項目です。")
        )
        .min(1, "urlには少なくとも1つの項目が必要です。")
        .required("入力必須の項目です。")
    : Yup.array().of(Yup.string()).default([]);
};

// プロンプトの指示文入力欄の設定
const promptInput = (
  inputTypeNames: string[],
  requiredInputTypeNames: string[]
) => {
  return isInputTypes(inputTypeNames, requiredInputTypeNames)
    ? Yup.string()
        .required("入力必須の項目です。")
        .max(255, "255文字以下にしてください。")
    : Yup.string().default("");
};

// Jsonアウトプットのテーブル説明の設定
const tableDescription = (
  inputTypeNames: string[],
  requiredInputTypeNames: string[]
) => {
  return isInputTypes(inputTypeNames, requiredInputTypeNames)
    ? Yup.string()
        .required("入力必須の項目です。")
        .max(255, "255文字以下にしてください。")
    : Yup.string().default("");
};

// Jsonアウトプットのテーブルの設定
const table = (inputTypeNames: string[], requiredInputTypeNames: string[]) => {
  return isInputTypes(inputTypeNames, requiredInputTypeNames)
    ? Yup.array()
        .of(
          Yup.object().shape({
            key: Yup.string().required("keyは必須です。"),
            type: Yup.object().required("typeは必須です。"),
            description: Yup.string().required("descriptionは必須です。"),
            // examples: Yup.string().required("examplesは必須です。"),
            examples: Yup.array()
              .of(Yup.string().required("exampleは必須です。"))
              .min(1, "exampleには少なくとも1つの項目が必要です。")
              .required("examplesは必須です。"),
          })
        )
        .min(1, "tableには少なくとも1つの項目が必要です。")
        .required("tableは必須です。")
    : Yup.array()
        .of(
          Yup.object().shape({
            key: Yup.string(),
            type: Yup.object(),
            description: Yup.string(),
            // examples: Yup.string().required("examplesは必須です。"),
            examples: Yup.array().of(Yup.string()),
          })
        )
        .default([]);
};
