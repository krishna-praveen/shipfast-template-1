import apiClient from '@/services/api'

import { IAuthSignInResponse, IAuthSignInPayload } from '@/types/models/authSignIn.model'

export const authSignInRequest = async ({ email, password }: IAuthSignInPayload): Promise<IAuthSignInResponse> => {
  const { data } = await apiClient.post("/auth/sign-in", {
    email,
    password
  })

  return data
}
