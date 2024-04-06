import * as Yup from "yup";

export const aiPromptValidation = () => {
  const simpleSchema = Yup.object().shape({
    url: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    input: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    table_input: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    table: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required("keyは必須です。"),
        type: Yup.string().required("typeは必須です。"),
        description: Yup.string().required("descriptionは必須です。"),
        examples: Yup.string().required("examplesは必須です。"),
        // examples: Yup.array().of(Yup.string()).required("examplesは必須です。"),
      })
    ),
  });

  return { simpleSchema };
};
