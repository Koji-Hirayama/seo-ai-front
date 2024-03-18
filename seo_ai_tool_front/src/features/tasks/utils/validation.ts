import { AiType } from "@/types/modelTypes";
import * as Yup from "yup";

export const createTaskFormValidation = (options: AiType[]) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("入力必須の項目です。")
      .max(255, "255文字以下にしてください。"),
    description: Yup.string().default(""),
    selectBox: Yup.object()
      .oneOf(options, "選択は必須です")
      .required("選択は必須です"),
  });
  return { schema };
};
