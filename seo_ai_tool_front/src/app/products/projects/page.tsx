"use client";
import Header from "@/components/layouts/Header";
import CreateProjectFormModal from "@/features/projects/components/CreateProjectFormModal";
import ProjectList from "@/features/projects/components/ProjectList";
import { useQueryGetProjectsForUser } from "@/features/projects/hooks/useQueryGetProjectsForUser";
import useLoadingScreenStore from "@/stores/loadingScreenStore";
import React, { useEffect, useState } from "react";

function Page() {
  const [isOpenCreateProjectForm, setIsOpenCreateProjectForm] = useState(false);
  const { openLoadingScreen, resetLoadingScreen } = useLoadingScreenStore();
  const { data: projectUsers, isSuccess } = useQueryGetProjectsForUser();
  console.log("projects");

  useEffect(() => {
    isSuccess ? resetLoadingScreen() : openLoadingScreen("読み込み中");
  }, [isSuccess]);

  if (!isSuccess) return null;
  return (
    <>
      <Header />
      <main className="">
        <div className="p-2">
          <button
            className="btn1 text-[12px]"
            onClick={() => {
              setIsOpenCreateProjectForm(true);
            }}
          >
            新規プロジェクト
          </button>
        </div>
        <div className="mt-10">
          <p className="px-4">プロジェクト一覧</p>
          <ProjectList projectUsers={projectUsers} />
        </div>
      </main>
      <CreateProjectFormModal
        isOpen={isOpenCreateProjectForm}
        onClose={() => setIsOpenCreateProjectForm(false)}
      />
    </>
  );
}

export default Page;
