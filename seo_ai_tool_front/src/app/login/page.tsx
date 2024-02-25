import { Form } from "@/components/form/Form";
import React from "react";

const page = () => {
  return (
    <div className="h-screen bg-white flex justify-center items-center flex-col">
      <p className="text-[32px] font-bold">ログイン</p>
      <div className="mt-7">
        <Form />
      </div>
    </div>
  );
};

export default page;
