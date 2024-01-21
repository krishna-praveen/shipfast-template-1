import apiClient from '@/services/api'

import { IAuthRequestResetPasswordPayload } from '@/types/models/authRequestResetPassword.model'

export const authResetPassawordRequest = async ({ email }: IAuthRequestResetPasswordPayload) => {
  const redirectTo = window.location.origin + "/reset-password";

  await apiClient.post("/auth/request-reset-password", {
    email,
    redirectTo
  })
}
