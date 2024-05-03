"use client";

import Header from "@/components/layouts/Header";
import React, { useEffect } from "react";
import useParamsStore from "@/stores/paramsStore";
import { useQueryGetAiModels } from "@/features/aiModels/hooks/useQueryGetAiModels";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import SimpleAi from "@/features/ai/components/SimpleAi";
import TaskAiDirector from "@/features/ai/components/TaskAiDirector";
import useTaskAiStore from "@/features/ai/stores/taskAiStore";
import { useQueryGetAiTypeAiInputFields } from "@/features/ai/hooks/useQueryGetAiTypeAiInputFields";

const Page = ({
  params,
}: {
  params: { projectId: number; taskId: number; aiTypeId: number };
}) => {
  const { resetLoadingScreen, openLoadingScreen } = useLoadingScreenStore();
  const { setParams } = useParamsStore();
  const { data: aiModels, isSuccess: isAiModels } = useQueryGetAiModels();
  const { data: aiTypeAiInputs, isSuccess: isAiTypeAiInputs } =
    useQueryGetAiTypeAiInputFields({
      project_id: params.projectId,
      ai_type_id: params.aiTypeId,
    });
  const { setTaskAi } = useTaskAiStore();
  const isSuccess = isAiModels && isAiTypeAiInputs;
  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    if (isSuccess) {
      setParams(params.projectId, params.taskId);
      setTaskAi(params.taskId);
      console.log(aiTypeAiInputs);
    }
  }, [isSuccess]);
  if (!isSuccess) return null;
  return (
    <>
      <Header />
      {/* <Sidemenu /> */}
      <main className="relative">
        <div
        // className="ml-[200px]"
        >
          {
            <TaskAiDirector
              aiModels={aiModels}
              aiTypeAiInputs={aiTypeAiInputs}
              aiTypeId={params.aiTypeId}
            />
          }
          {/* <SimpleAi aiModels={aiModels} /> */}
        </div>
      </main>
    </>
  );
};

export default Page;
