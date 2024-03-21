"use client";
import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import { useQueryGetAiTypes } from "@/features/aiType/hooks/useQueryGetAiTypes";
import CreateTaskFormModal from "@/features/tasks/components/CreateTaskFormModal";
import TaskListMemo from "@/features/tasks/components/TaskList";
import { useQueryGetTasksForProject } from "@/features/tasks/hooks/useQueryGetTasksForProject";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { projectId: string } }) => {
  const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
  const { setOpenLoadingScreen, resetLoadingScreen } = useLoadingScreenStore();
  const projectTasks = useQueryGetTasksForProject(Number(params.projectId));
  const aiTypes = useQueryGetAiTypes();
  const isSuccess = projectTasks.isSuccess && aiTypes.isSuccess;
  const error = projectTasks.error || aiTypes.error;
  console.log("tasks");

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : setOpenLoadingScreen("読み込み中");
    error && console.log(error);
  }, [isSuccess, error]);

  if (!isSuccess) return null;
  return (
    <>
      <Header />
      <main className="relative">
        <Sidemenu />
        <div className="ml-[200px]">
          {/* <Tasks projectId={Number(params.projectId)} /> */}

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
            <TaskListMemo tasks={projectTasks.data.tasks} />
          </div>
        </div>
      </main>
      <CreateTaskFormModal
        isOpen={isOpenCreateTaskForm}
        onClose={() => setIsOpenCreateTaskForm(false)}
        aiTypes={aiTypes.data}
        project_id={projectTasks.data.id}
      />
    </>
  );
};

export default Page;
