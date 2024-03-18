"use client";
import Header from "@/components/layouts/Header";
import Projects from "@/features/projects/components/Projects";
import React from "react";

function page() {
  return (
    <>
      <Header />
      <main className="">
        <Projects />
      </main>
    </>
  );
}

export default page;
