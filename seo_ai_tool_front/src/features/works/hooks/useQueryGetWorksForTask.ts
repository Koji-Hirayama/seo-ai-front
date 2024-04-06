import queryKeys from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getWorksForTask } from "../services/getWorksForTaskService";
import { Work } from "@/types/modelTypes";

export const useQueryGetWorksForTask = (peojectId: number, taskId: number) => {
  return useQuery<Work[], Error>({
    queryKey: queryKeys.works.byTaskId(taskId),
    queryFn: () => getWorksForTask(peojectId, taskId),
    staleTime: 0,
  });
};
