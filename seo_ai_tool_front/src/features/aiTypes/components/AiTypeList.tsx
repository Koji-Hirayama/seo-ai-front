import { AiType } from "@/types/modelTypes";
import React from "react";
import AiTypeItem from "./AiTypeItem";

type AiTypeProps = {
  aiTypes: AiType[];
};

const AiTypeList = ({ aiTypes }: AiTypeProps) => {
  return (
    <ul className="flex flex-wrap mt-2">
      {aiTypes.map((aiType) => (
        <AiTypeItem key={aiType.id} aiType={aiType} />
      ))}
    </ul>
  );
};

export default AiTypeList;
