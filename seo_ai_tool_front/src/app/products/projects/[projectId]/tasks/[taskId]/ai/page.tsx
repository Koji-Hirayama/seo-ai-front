"use client";
import Header from "@/components/layouts/Header";
import React, { useEffect } from "react";
import useParamsStore from "@/stores/paramsStore";
import { useQueryGetAiModels } from "@/features/aiModels/hooks/useQueryGetAiModels";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import SimpleAi from "@/features/ai/components/SimpleAi";

const Page = ({
  params,
}: {
  params: { projectId: number; taskId: number };
}) => {
  const { resetLoadingScreen, openLoadingScreen } = useLoadingScreenStore();
  const { setParams } = useParamsStore();
  const { data: aiModels, isSuccess } = useQueryGetAiModels();

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    setParams(params.projectId, params.taskId);
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
          <SimpleAi aiModels={aiModels} />
        </div>
      </main>
    </>
  );
};

export default Page;
