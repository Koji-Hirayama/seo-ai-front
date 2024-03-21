import * as Yup from "yup";

export const createProjectFormValidation = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
  });

  return { schema };
};
