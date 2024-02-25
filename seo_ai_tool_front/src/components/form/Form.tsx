"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "./validation";

// 1
type ContactFormData = yup.InferType<typeof schema>;

export const Form = () => {
  // 2
  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    resolver: yupResolver(schema), // Yupとの紐づけ
    mode: "onBlur", // バリデーションチェックのタイミングを設定
  });
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    //入力したデータを使って任意の処理を実装する
    console.log(data);
  };

  // 3
  return (
    <form
      className="w-[600px] space-y-4 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2 bg-white">
        <label className="font-bold text-[18px]">メールアドレス</label>
        <input
          className="bg-white border-gray-200 border rounded-lg p-3 outline-none focus:border-sky-500"
          {...register("email")}
        />
        <span className="text-red-500">{formState.errors.email?.message}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-bold text-[18px]">パスワード</label>
        <input
          className="bg-white border-gray-200 border rounded-lg p-3 outline-none focus:border-sky-500"
          type="password"
          autoComplete="false"
          {...register("password")}
        />
        <span className="text-red-500">
          {formState.errors.password?.message}
        </span>
      </div>
      <div className="bg-sky-500 text-white text-center font-bold rounded-lg h-[56px]">
        <button type="submit" className="w-full h-full">
          ログイン
        </button>
      </div>
    </form>
  );
};
