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
  const { setLoadingModal, resetLoadingModal } = useLoadingModalStore();
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
    console.log(data);
    const ai_type: AiType = data.selectBox as AiType;
    const form: RequestCreateTask = {
      name: data.name,
      description: data.description,
      ai_type_id: ai_type.id,
      project_id: project_id,
    };
    console.log("AiTypeData", ai_type);
    console.log("FormData", form);

    setLoadingModal(true, "処理中です");

    const res = await createTaskMutation.mutateAsync(form);
    console.log("タスク作成完了", res);
    resetLoadingModal();
    close();
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
      onClose={onClose}
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
      <FormButton
        text="作成"
        widthClass="min-w-[50%]"
        isValid={methods.formState.isValid}
      />
    </FormModal>
  );
};

export default CreateTaskFormModal;
