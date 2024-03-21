import { useMutation } from "@tanstack/react-query";
import { createToken, initAuth } from "../services/authService";

const useMutateAuth = () => {
  const createTokenMutation = useMutation({
    mutationFn: createToken,
  });

  const initAuthMutation = useMutation({
    mutationFn: initAuth,
  });

  return { createTokenMutation, initAuthMutation };
};

export default useMutateAuth;
