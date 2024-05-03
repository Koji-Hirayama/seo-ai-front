import TabSwitcherWindow from "@/components/windows/TabSwitcherWindow";
import React from "react";
import useTaskAiStore from "../stores/taskAiStore";
import LoadingInline from "@/components/loadings/LoadingInline";
import OutputSimpleTable from "./OutputSimpleTable";
import OutputTable from "./OutputTable";
import ErrorOutputTable from "./ErrorOutputTable";
import { ErrorOutput } from "../types";

type AiOutputWrapperProps = {
  activeTabKey: string;
  setActiveTabKey: React.Dispatch<React.SetStateAction<string>>;
};
const AiOutputWrapper = ({
  activeTabKey,
  setActiveTabKey,
}: AiOutputWrapperProps) => {
  const { getOutputs } = useTaskAiStore();
  const getTabOutputs = (tabKey: string) => {
    if (tabKey === "all") {
      return getOutputs();
    } else {
      return getOutputs().filter((x) => x.tabCategory === tabKey);
    }
  };
  return (
    <TabSwitcherWindow
      defaultTabKey={"1"}
      tabKyeValues={[
        { key: "1", value: "前処理" },
        { key: "2", value: "AI入出力結果" },
        { key: "all", value: "全て" },
      ]}
      activeTabKey={activeTabKey}
      setActiveTabKey={setActiveTabKey}
      children={(tab) => {
        return (
          <>
            <div className="grid gap-6">
              {getTabOutputs(tab.key)
                ?.reverse()
                .map((output, index) => (
                  <div key={index} className="grid gap-1">
                    <span
                      className={`text-sm ${
                        output.outputCategory === "error" &&
                        "text-failure-1 font-semibold"
                      }`}
                    >
                      {output.answerer}
                    </span>
                    {output.status === "loading" ? (
                      <LoadingInline text="AIが頑張ってます。" width="140px" />
                    ) : (
                      <>
                        {output.outputCategory === "scraping" && (
                          <OutputSimpleTable datas={output.datas} />
                        )}
                        {(output.outputCategory === "prompt" ||
                          output.outputCategory === "output") && (
                          <OutputTable datas={output.datas} />
                        )}
                        {output.outputCategory === "error" && (
                          <ErrorOutputTable
                            error_output={
                              { error: output.datas[0] } as ErrorOutput
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>
          </>
        );
      }}
    />
  );
};

export default AiOutputWrapper;
