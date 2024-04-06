import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ParamsStore = {
  projectId?: number;
  taskId?: number;
  workId?: number;
  setProjectId: (projectId: number) => void;
  setTaskId: (taskId: number) => void;
  setWorkId: (workId: number) => void;
  setParams: (projectId?: number, taskId?: number, workId?: number) => void;
};

const useParamsStore = create<ParamsStore>()(
  devtools((set) => ({
    projectId: undefined,
    taskId: undefined,
    workId: undefined,
    setProjectId: (projectId) => set({ projectId }),
    setTaskId: (taskId) => set({ taskId }),
    setWorkId: (workId) => set({ workId }),
    setParams: (projectId, taskId, workId) =>
      set({ projectId, taskId, workId }),
  }))
);
export default useParamsStore;
