"use client";
import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import { useQueryGetAiTypes } from "@/features/aiTypes/hooks/useQueryGetAiTypes";
import CreateTaskFormModal from "@/features/tasks/components/CreateTaskFormModal";
import TaskListMemo from "@/features/tasks/components/TaskList";
import { useQueryGetTasksForProject } from "@/features/tasks/hooks/useQueryGetTasksForProject";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import useParamsStore from "@/stores/paramsStore";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { projectId: number } }) => {
  const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
  const { openLoadingScreen, resetLoadingScreen } = useLoadingScreenStore();
  const tasks = useQueryGetTasksForProject(params.projectId);
  const aiTypes = useQueryGetAiTypes();
  const isSuccess = tasks.isSuccess && aiTypes.isSuccess;
  const { setParams } = useParamsStore();
  console.log("tasks");

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
    setParams(params.projectId, undefined, undefined);
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
                setIsOpenCreateTaskForm(true);
              }}
            >
              新規タスク
            </button>
          </div>
          <div className="mt-10">
            <p className="px-4">タスク一覧</p>
            <TaskListMemo tasks={tasks.data} />
          </div>
        </div>
      </main>
      <CreateTaskFormModal
        isOpen={isOpenCreateTaskForm}
        onClose={() => setIsOpenCreateTaskForm(false)}
        aiTypes={aiTypes.data}
        project_id={params.projectId}
      />
    </>
  );
};

export default Page;
