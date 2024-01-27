import apiClient from '@/services/api'
import { useSession } from '@/services/hooks/useSession';
import { IRegisterStudentsPayload } from '@/types/models/registerStudents.model';

export const registerStudentsRequest = async ({ birthDate, city, email, gender, name, phone, state, surname }: IRegisterStudentsPayload) => {
  const session = await useSession();
  const userId = session.user.id;

  await apiClient.post("/students", {
    name,
    surname,
    birthDate,
    gender,
    state,
    city,
    email,
    phone
  },
    {
      params: {
        userId
      }
    }
  )
}
