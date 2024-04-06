import { yupResolver } from "@hookform/resolvers/yup";
import yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { schema } from "./validation";
import useMutateAuth from "@/features/auth/hooks/useMutateAuth";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useRouter } from "next/navigation";

// 1
type ContactFormData = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const router = useRouter();
  const { createTokenMutation } = useMutateAuth();
  const { setIsAuth } = useAuthStore();

  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    resolver: yupResolver(schema), // Yupとの紐づけ
    mode: "onBlur", // バリデーションチェックのタイミングを設定
  });
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    //入力したデータを使って任意の処理を実装する
    createTokenMutation
      .mutateAsync({ email: data.email, password: data.password })
      .then(() => {
        setIsAuth(true);
        router.push("/products/projects");
      });
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
