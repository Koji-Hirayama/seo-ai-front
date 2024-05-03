import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Output, OutputCategory } from "../types";

type TaskAiOutput = {
  taskId: number;
  outputs: Output[];
};

type TaskAiStore = {
  taskId: number;
  setTaskAi: (taskId: number) => void;
  taskAiOutputs: TaskAiOutput[];
  getOutputs: () => Output[];
  createLoadingOutput: (
    answerer: string,
    tabCategory: string,
    outputCategory: OutputCategory
  ) => Output;
  updateSuccessOutput: (targetOutput: Output) => void;
};

const useTaskAiStore = create<TaskAiStore>()(
  devtools((set, get) => ({
    taskId: 0,
    setTaskAi: (taskId) => {
      set((state) => {
        const exists = state.taskAiOutputs.some((x) => x.taskId === taskId);
        if (!exists) {
          const newTaskAiOutput: TaskAiOutput = { taskId: taskId, outputs: [] };
          return {
            taskId: taskId,
            taskAiOutputs: [...state.taskAiOutputs, newTaskAiOutput],
          };
        }
        return { taskId: taskId };
      });
    },
    taskAiOutputs: [],
    getOutputs: () => {
      const outputs = get().taskAiOutputs.find(
        (x) => x.taskId == get().taskId
      )?.outputs;
      return outputs !== undefined ? outputs : [];
    },
    createLoadingOutput: (answerer, tabCategory, outputCategory) => {
      const newOutput: Output = {
        id: `${answerer}${Math.floor(Math.random() * 1000)}`,
        answerer: answerer,
        status: "loading",
        datas: [],
        tabCategory: tabCategory,
        outputCategory: outputCategory,
      };
      set((state) => {
        const updatedTaskAiOutputs = state.taskAiOutputs.map((taskAi) =>
          taskAi.taskId === state.taskId
            ? { ...taskAi, outputs: [...taskAi.outputs, newOutput] }
            : taskAi
        );
        return { taskAiOutputs: updatedTaskAiOutputs };
      });
      return newOutput;
    },
    updateSuccessOutput: (targetOutput) => {
      set((state) => {
        const updatedTaskAiOutputs = state.taskAiOutputs.map((taskAi) => {
          if (taskAi.taskId === state.taskId) {
            const updatedOutputs = taskAi.outputs.map((output) => {
              return output.id === targetOutput.id
                ? ({
                    ...output,
                    ...targetOutput,
                    answerer: targetOutput.answerer,
                    datas: targetOutput.datas,
                    tabCategory: targetOutput.tabCategory,
                    outputCategory: targetOutput.outputCategory,
                    status: "success",
                  } as Output)
                : output;
            });
            return { ...taskAi, outputs: updatedOutputs }; // 正しく出力を更新
          }
          return taskAi;
        });
        return { taskAiOutputs: updatedTaskAiOutputs };
      });
    },
  }))
);

export default useTaskAiStore;
