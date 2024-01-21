import apiClient from '@/services/api';

import { useSession } from '@/services/hooks/useSession';

import { IAssessmentsResponse } from '@/types/models/listAssessments.model';

export const listAssessmentsRequest = async (): Promise<IAssessmentsResponse> => {
  const session = await useSession();

  const { data: assessments } = await apiClient.get<IAssessmentsResponse>("/assessments", { params: { userId: session.user.id } })

  const sortedAndFormattedAssessments = assessments
    .map((assessment) => ({
      ...assessment,
      endDate: new Date(assessment.endDate)
    }))
    .sort((a: { endDate: Date }, b: { endDate: Date }) => a.endDate.getTime() - b.endDate.getTime())
    .map((assessment) => ({
      ...assessment,
      endDate: new Intl.DateTimeFormat('pt-BR').format(assessment.endDate)
    }));

  return sortedAndFormattedAssessments;
}
