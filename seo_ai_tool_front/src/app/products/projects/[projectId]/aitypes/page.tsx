"use client";
import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import AiTypeList from "@/features/aiTypes/components/AiTypeList";
import { useQueryGetAiTypes } from "@/features/aiTypes/hooks/useQueryGetAiTypes";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import useParamsStore from "@/stores/paramsStore";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { projectId: number } }) => {
  const { openLoadingScreen, resetLoadingScreen } = useLoadingScreenStore();
  const { data: aiTypes, isSuccess } = useQueryGetAiTypes();
  const { setParams } = useParamsStore();

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    setParams(params.projectId);
  }, [isSuccess]);

  if (!isSuccess) return null;
  return (
    <>
      <Header />
      <main className="relative">
        <Sidemenu />
        <div className="ml-[200px]">
          <div className="pt-10">
            <p className="px-4">AIタイプ一覧</p>
            <AiTypeList aiTypes={aiTypes} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
