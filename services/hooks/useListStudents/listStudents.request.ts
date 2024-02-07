import apiClient from "@/services/api";

import { useSession } from "@/services/hooks/useSession";

import { IListStudentsResponse } from "@/types/models/listStudents.model";

export const listStudentsRequest = async (): Promise<IListStudentsResponse> => {
  const session = await useSession();

  const { data: students } = await apiClient.get("/students", {
    params: { userId: session.user.id },
  });

  return students;
};
