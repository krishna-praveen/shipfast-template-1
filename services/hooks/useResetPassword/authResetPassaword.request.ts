import apiClient from '@/services/api'

import { IAuthSignInPayload } from '@/types/models/authSignIn.model'

export const authResetPassawordRequest = async ({ password }: IAuthSignInPayload) => {
  await apiClient.post("/auth/reset-password", {
    password
  })
}
