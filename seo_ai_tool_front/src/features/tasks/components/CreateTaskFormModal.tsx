import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import yup from "yup";
import FormModal from "@/components/form/FormModal";
import { createTaskFormValidation } from "../utils/validation";
import FormShortTextField from "@/components/form/fields/FormShortTextField";
import FormLongTextField from "@/components/form/fields/FormLongTextField";
import FormSelectBoxField from "@/components/form/fields/FormSelectBoxField";
import FormButton from "@/components/form/fields/FormButton";
import { AiType } from "@/types/modelTypes";
import { RequestCreateTask } from "../types";
import { useMutateCreateTask } from "../hooks/useMutateCreateTask";
import useLoadingModalStore from "@/stores/loadingModalStore";
import useSuccessModalStore from "@/stores/successModalStore";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAxiosResponseError } from "@/hooks/useError";

type CreateTaskFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  aiTypes: AiType[];
  project_id: number;
};
const CreateTaskFormModal = ({
  isOpen,
  onClose,
  aiTypes,
  project_id,
}: CreateTaskFormModalProps) => {
  console.log("CreateTaskFormModal");
  const router = useRouter();
  const { setOpenLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setOpenSuccessModal } = useSuccessModalStore();
  const { setError } = useAxiosResponseError();
  const createTaskMutation = useMutateCreateTask();
  const { schema } = createTaskFormValidation(aiTypes);
  type ContactFormData = yup.InferType<typeof schema>;
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(schema), // Yupとの紐づけ
    mode: "onBlur", // バリデーションチェックのタイミングを設定
    defaultValues: {
      name: "",
      description: "",
      selectBox: {},
    },
  });
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    //入力したデータを使って任意の処理を実装する
    const ai_type: AiType = data.selectBox as AiType;
    const form: RequestCreateTask = {
      name: data.name,
      description: data.description,
      ai_type_id: ai_type.id,
      project_id: project_id,
    };
    setOpenLoadingModal("処理中です");
    await createTaskMutation
      .mutateAsync(form)
      .then(() => {
        close();
        setOpenSuccessModal("タスクを作成しました", "Continue", () => {
          //   router.push(`/products/projects/${project_id}/tasks/??????`);
        });
      })
      .catch((error: AxiosError) => {
        setError(error, "タスクの作成に失敗しました。", "閉じる");
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
      title="タスク作成"
      isOpen={isOpen}
      onClose={close}
      onSubmit={onSubmit}
      useFormMethods={methods}
      isCloseButton={true}
      width="50%"
    >
      <FormShortTextField
        name="name"
        label="タスク名"
        placeholder="〇〇タスク"
      />
      <FormSelectBoxField
        name="selectBox"
        label="AIタイプ"
        options={aiTypes}
        optionLabelKey={"name"}
        placeholder="AIタイプ選択"
      />
      <FormLongTextField
        name="description"
        label="タスクの説明"
        isNotRequired={true}
        placeholder="AIが〇〇を行うタスクです。"
      />
      <FormButton text="作成" width="50%" isValid={methods.formState.isValid} />
    </FormModal>
  );
};

export default CreateTaskFormModal;
