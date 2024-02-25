import * as Yup from "yup";

// const passwordRegex =
//   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const schema = Yup.object().shape({
  email: Yup.string()
    .required("入力必須の項目です。")
    .email("メールアドレスの形式が不正です。"),
  password: Yup.string()
    .required("入力必須の項目です。")
    .matches(
      passwordRegex,
      "※パスワードは大文字、数字を含む英数字8文字以上で設定してください"
    ),
});
