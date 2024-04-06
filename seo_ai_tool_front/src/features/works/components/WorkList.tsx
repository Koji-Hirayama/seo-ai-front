import { Work } from "@/types/modelTypes";
import React, { memo } from "react";
import WorkItem from "./WorkItem";

type WorkListProps = {
  works: Work[];
};
const WorkList = ({ works }: WorkListProps) => {
  console.log("WorkList");
  return (
    <ul className="flex flex-wrap mt-2">
      {works.map((work) => (
        <WorkItem key={work.id} work={work} />
      ))}
    </ul>
  );
};

const WorkListMemo = memo(WorkList);
export default WorkListMemo;
