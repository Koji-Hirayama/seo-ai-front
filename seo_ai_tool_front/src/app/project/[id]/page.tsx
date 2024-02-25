import Header from "@/components/layouts/Header";
import Sidemenu from "@/components/layouts/Sidemenu";
import Project from "@/features/project/components/Project";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Header />

      <main className="relative">
        <Sidemenu />
        <div className="ml-[200px]">
          <Project />
        </div>
      </main>
    </>
  );
};

export default page;
