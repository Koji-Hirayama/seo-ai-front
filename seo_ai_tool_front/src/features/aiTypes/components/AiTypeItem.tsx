import { useMutateCreateTask } from "@/features/tasks/hooks/useMutateCreateTask";
import { RequestCreateTask } from "@/features/tasks/types";
import { useAxiosResponseError } from "@/hooks/useError";
import useLoadingModalStore from "@/stores/loadingModalStore";
import useParamsStore from "@/stores/paramsStore";
import { AiType } from "@/types/modelTypes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type AiTypeItemProps = {
  aiType: AiType;
};

const AiTypeItem = ({ aiType }: AiTypeItemProps) => {
  const createTaskMutation = useMutateCreateTask();
  const { projectId } = useParamsStore();
  const { openLoadingModal, resetLoadingModal } = useLoadingModalStore();
  const { setError } = useAxiosResponseError();
  const router = useRouter();

  const createAiTypeTask = async () => {
    //入力したデータを使って任意の処理を実装する
    const form: RequestCreateTask = {
      name: `未保存(${aiType.name})`,
      description: "",
      ai_type_id: aiType.id,
      project_id: projectId as number,
      is_save: false,
    };
    openLoadingModal("AIの準備中");
    await createTaskMutation
      .mutateAsync(form)
      .then((res) => {
        router.push(`/products/projects/${projectId}/tasks/${res.id}/ai`);
      })
      .catch((error: AxiosError) => {
        setError(
          error,
          "AIの準備ができませんでした。再度お試しください。",
          "閉じる"
        );
      })
      .finally(resetLoadingModal);
  };

  return (
    <li className="min-w-[33%] h-[202px] px-4 mb-5">
      <button
        className="bg-white w-full h-full shadow-lg rounded-lg block p-2"
        onClick={createAiTypeTask}
      >
        <p>{aiType.name}</p>
        <p>{aiType.description}</p>
      </button>
    </li>
  );
};

export default AiTypeItem;
