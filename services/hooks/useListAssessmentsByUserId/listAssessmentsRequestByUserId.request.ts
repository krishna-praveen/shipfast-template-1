import { useSession } from '@/services/hooks/useSession';
import apiServer from '@/services/serverApi';


import { IListAssessmentsByUserIdPayload, IListAssessmentsByUserIdResponse } from '@/types/models/listAssessmentsByUserId.model';

export const listAssessmentsRequestByUserId = async ({ studentId }: IListAssessmentsByUserIdPayload): Promise<IListAssessmentsByUserIdResponse> => {
  const session = await useSession();

  const data = await apiServer.get<IListAssessmentsByUserIdResponse>(`/assessments/${session.user.id}/users/${studentId}/students `, { headers: { Authorization: `${session.access_token}` } });
  const assessments: IListAssessmentsByUserIdResponse = data as any;
  const sortedAndFormattedAssessments = assessments
    .map((assessment) => ({
      ...assessment,
      endDate: new Date(assessment.endDate)
    }))
    .sort((a: { endDate: Date }, b: { endDate: Date }) => a.endDate.getTime() - b.endDate.getTime())


  return sortedAndFormattedAssessments;
}
