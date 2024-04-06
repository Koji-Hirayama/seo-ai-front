"use client";
import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import WorkListMemo from "@/features/works/components/WorkList";
import { useQueryGetWorksForTask } from "@/features/works/hooks/useQueryGetWorksForTask";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import useParamsStore from "@/stores/paramsStore";
import React, { useEffect } from "react";

const Page = ({
  params,
}: {
  params: { projectId: number; taskId: number };
}) => {
  console.log("works");
  const { data: works, isSuccess } = useQueryGetWorksForTask(
    params.projectId,
    params.taskId
  );
  const { openLoadingScreen, resetLoadingScreen } = useLoadingScreenStore();
  const { setParams } = useParamsStore();

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    setParams(params.projectId, params.taskId, undefined);
  }, [isSuccess]);
  if (!isSuccess) return null;
  return (
    <>
      <Header />
      <main className="relative">
        <Sidemenu />
        <div className="ml-[200px]">
          <div className="p-2">
            <button
              className="btn1 text-[12px]"
              onClick={() => {
                // setIsOpenCreateTaskForm(true);
              }}
            >
              新規AI仕事
            </button>
          </div>
          <div className="mt-10">
            <p className="px-4">AI仕事一覧</p>
            <WorkListMemo works={works} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
