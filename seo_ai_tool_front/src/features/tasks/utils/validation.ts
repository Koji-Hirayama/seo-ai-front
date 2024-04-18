import * as Yup from "yup";

export const createTaskFormValidation = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    description: Yup.string().default(""),
    // aiType: Yup.object({
    //   label: Yup.string().required("選択は必須です"),
    //   value: Yup.object().required("選択は必須です"),
    // })
    // .required("選択は必須です"),
    aiType: Yup.object().required("選択は必須です"),
  });
  return { schema };
};
