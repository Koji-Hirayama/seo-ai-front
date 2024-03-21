import FormModal from "@/components/form/FormModal";
import useLoadingModalStore from "@/stores/loadingModalStore";
import React from "react";
import { createProjectFormValidation } from "../utils/validation";
import yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestCreateProject } from "../types";
import FormShortTextField from "@/components/form/fields/FormShortTextField";
import FormButton from "@/components/form/fields/FormButton";
import { useMutateCreateProject } from "../hooks/useMutateCreateProject";
import useSuccessModalStore from "@/stores/successModalStore";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAxiosResponseError } from "@/hooks/useError";

type CreateProjectFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProjectFormModal = ({
  isOpen,
  onClose,
}: CreateProjectFormModalProps) => {
  console.log("CreateProjectFormModal");
  const router = useRouter();
  const { setOpenLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setOpenSuccessModal } = useSuccessModalStore();
  const { setError } = useAxiosResponseError();
  const createProjectMutation = useMutateCreateProject();
  const { schema } = createProjectFormValidation();
  type ContactFormData = yup.InferType<typeof schema>;
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const form: RequestCreateProject = {
      name: data.name,
    };
    setOpenLoadingModal("処理中です");
    await createProjectMutation
      .mutateAsync(form)
      .then((res) => {
        setOpenSuccessModal("プロジェクトを作成しました", "Continue", () => {
          router.push(`/products/projects/${res.project?.id}/tasks`);
        });
        close();
      })
      .catch((error: AxiosError) => {
        setError(error, "プロジェクトの作成に失敗しました", "閉じる");
      })
      .finally(resetLoadingModal);
  };
  const close = () => {
    onClose();
    //入力フォームリセット
    methods.reset();
  };
  return (
    <FormModal
      title="プロジェクト作成"
      isOpen={isOpen}
      onClose={close}
      onSubmit={onSubmit}
      useFormMethods={methods}
      isCloseButton={true}
      width="40%"
    >
      <FormShortTextField
        name="name"
        label="プロジェクト名"
        placeholder="〇〇プロジェクト"
      />
      <FormButton text="作成" width="50%" isValid={methods.formState.isValid} />
    </FormModal>
  );
};

export default CreateProjectFormModal;
