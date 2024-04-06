"use client";
import { LoginForm } from "@/components/form/LoginForm";
import React from "react";

const Page = () => {
  return (
    <div className="h-screen bg-white flex justify-center items-center flex-col">
      <p className="text-[32px] font-bold">ログイン</p>
      <div className="mt-7">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
