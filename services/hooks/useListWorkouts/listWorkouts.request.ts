import { useSession } from "@/services/hooks/useSession";
import apiServer from "@/services/serverApi";


import { IWorkoutsResponse } from "@/types/models/listWorkouts.model";

export const listWorkoutsRequest = async (): Promise<IWorkoutsResponse> => {
  const session = await useSession();

  const { data: workouts } = await apiServer.get<IWorkoutsResponse>(
    `/workouts`,
    {
      params: { userId: session.user.id },
      headers: {
        Authorization: `${session.access_token}`,
      },
    }
  );

  const sortedWorkouts = workouts.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return sortedWorkouts;
};
