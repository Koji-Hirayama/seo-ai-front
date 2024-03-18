import { ProjectUser } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import { getProjectsForUser } from "../services/getProjectsForUserService";
import queryKeys from "@/constants/queryKeys";

export const useQueryGetProjectsForUser = () => {
  return useQuery<ProjectUser[], Error>({
    queryKey: queryKeys.projects.byUser,
    queryFn: getProjectsForUser,
    staleTime: 0,
  });
};
