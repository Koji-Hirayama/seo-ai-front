import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "next/navigation";
import { createToken, initAuth } from "../services/authService";
import { Auth } from "../types";

const useMutateAuth = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthStore();

  const createTokenMutation = useMutation({
    mutationFn: createToken,
    onSuccess: (res) => {
      setIsAuth(true);
      router.push("/products/projects");
    },
  });

  const initAuthMutation = useMutation({
    mutationFn: initAuth,
    onSuccess: (res) => {
      const auth: Auth = res;
      setIsAuth(auth.is_auth);
    },
    onError: (error) => {
      router.push("/auth/signin");
    },
  });

  return { createTokenMutation, initAuthMutation };
};

export default useMutateAuth;
