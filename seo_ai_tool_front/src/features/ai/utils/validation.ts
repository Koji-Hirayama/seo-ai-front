import * as Yup from "yup";

export const aiPromptValidation = () => {
  const simpleSchema = Yup.object().shape({
    llm: Yup.object().required("選択は必須です"),
    urls: Yup.array()
      .of(
        Yup.string()
          .max(500, "500文字以下にしてください。")
          .required("入力必須の項目です。")
      )
      .min(1, "urlには少なくとも1つの項目が必要です。")
      .required("入力必須の項目です。"),
    input: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    table_description: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    table: Yup.array()
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
      .required("tableは必須です。"),
  });

  return { simpleSchema };
};
