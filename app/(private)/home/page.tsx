"use client"

import { BookText, Dumbbell, User } from "lucide-react";
import { useState } from "react";

import { BarChart } from "@/components/features/dashboard/BarChart";
import { Channels } from "@/components/features/dashboard/Channels";
import DoughnutChart from "@/components/features/dashboard/DoughnutChart";
import Layout from "@/components/layout/Layout";
import { CardStats } from "@/components/ui/CardStats";
import { Modal } from "@/components/ui/Modal";

import { useBilling } from '@/services/hooks/useBilling';
import { useListAssessments } from '@/services/hooks/useListAssessments';
import { useListStudents } from '@/services/hooks/useListStudents';
import { useListWorkouts } from '@/services/hooks/useListWorkouts';
import { useProfileInfo } from '@/services/hooks/useProfileInfo';

import { Student } from '@/types/models/base/Student';
import { Assessment } from '@/types/models/listAssessments.model';
import { Workout } from '@/types/models/listWorkouts.model';

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: listStudents, isLoading: isLoadingListStudents } = useListStudents({ refetchOnWindowFocus: false });
  const { data: listAssessments, isLoading: isLoadingListAssessments } = useListAssessments({ refetchOnWindowFocus: false });
  const { data: listWorkouts, isLoading: isLoadingListWorkouts } = useListWorkouts({ refetchOnWindowFocus: false });
  const { data: dataProfile, isLoading: isLoadingProfile } = useProfileInfo({
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (!data.profileCompleted) {
        setIsModalOpen(true)
      }
    }
  });

  const UseBilling = useBilling({
    options: {
      onSuccess: (data) => {
        window.location.href = data.url
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      }
    }
  })

  const handleBilling = async () => {
    try {
      await UseBilling.mutateAsync({ url: window.location.href })
    } catch (e) {
      console.error(e);
    }
  };

  const countByGenderMale = (students: Array<Student>) => {
    return students?.filter(student => student.gender === "male").length;
  };

  const countByGenderFemale = (students: Array<Student>) => {
    return students?.filter(student => student.gender === "female").length
  };

  const countBy3PollockAssessmentType = (assessments: Array<Assessment>) => {
    return assessments?.filter(assessment => assessment.assessmentType === "pollock_3").length
  };

  const countBy7PollockAssessmentType = (assessments: Array<Assessment>) => {
    return assessments?.filter(assessment => assessment.assessmentType === "pollock_7").length
  };

  const countWorkoutTypes = (workouts: Workout[]): Record<'ABC' | 'ABCD' | 'ABCDE', number> => {
    return workouts.reduce((acc: Record<'ABC' | 'ABCD' | 'ABCDE', number>, workout) => {
      const type = workout.type;
      if (type === "ABC" || type === "ABCD" || type === "ABCDE") {
        if (acc[type]) {
          acc[type] += 1;
        } else {
          acc[type] = 1;
        }
      }
      return acc;
    }, { 'ABC': 0, 'ABCD': 0, 'ABCDE': 0 });
  };

  const getLoading = () => {
    return isLoadingProfile && isLoadingListStudents && isLoadingListAssessments && isLoadingListWorkouts;
  }

  return (
    <Layout>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Faça sua inscrição!" isStatic={true}>
        <div className="space-y-4">
          <p>Agora que finalizamos o seu cadastro, o que você de escolhermos o plano que você mais se identificou?</p>
          <button onClick={handleBilling} className="btn btn-primary">Escolher Plano</button>
        </div>
      </Modal>

      <h1 className="text-3xl font-extrabold md:text-4xl">Dashboard</h1>
      <h2 className="mt-2 text-xl">Olá, {dataProfile?.user?.user_metadata?.name || ''}</h2>
      <h3 className="mt-2 text-base">Bem vindo de volta ao Pump!</h3>

      {!getLoading() &&
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardStats
              colorIndex={3}
              title="Estudantes"
              description="Total"
              value={listStudents?.length.toString()}
              icon={<User />}
            />

            <CardStats
              colorIndex={3}
              title="Avaliações"
              description="Total"
              value={listAssessments?.length.toString()}
              icon={<BookText />}
            />

            <CardStats
              colorIndex={3}
              title="Treinos"
              description="Total"
              value={listWorkouts?.length.toString()}
              icon={<Dumbbell />}
            />
          </div>

          <div className=" grid grid-cols-3 gap-6 lg:grid-cols-3">
            {
              listStudents && (
                <DoughnutChart
                  title="Distribuição por Gênero"
                  labels={["Masculino", "Feminino"]}
                  datasets={[{
                    data: [countByGenderMale(listStudents), countByGenderFemale(listStudents)],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                  }]}
                />
              )
            }
            {
              listAssessments && (
                <Channels
                  title="Avaliações Próximas a Expirarem"
                  data={listAssessments.map((assessment: Assessment) => ({
                    studentId: `${listStudents?.find((student: any) => student.id === assessment.studentId)?.name} ${listStudents?.find((student: any) => student.id === assessment.studentId)?.surname}`,
                    endDate: assessment.endDate
                  }))}
                  columns={["Nome do Aluno", "Data"]}
                />
              )
            }
            {
              listStudents && (
                <DoughnutChart
                  title="Distribuição por Tipo de Avaliação"
                  labels={["Pollock de 3 Dobras", "Pollock de 7 Dobras"]}
                  datasets={[{
                    data: [countBy3PollockAssessmentType(listAssessments), countBy7PollockAssessmentType(listAssessments)],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                  }]}
                />
              )
            }
          </div>

          <div className=" grid grid-cols-2 gap-6 lg:grid-cols-2">
            {
              listWorkouts && (
                <Channels
                  title="Últimos Treinos Adicionados"
                  data={listWorkouts.map((workout: Workout) => ({
                    studentId: `${listStudents?.find((student: any) => student.id === workout.studentId)?.name} ${listStudents?.find((student: any) => student.id === workout.studentId)?.surname}`,
                    createdAt: workout.createdAt.split('T')[0].replace(/-/g, '/'),
                  }))}
                  columns={["Nome do Aluno", "Data"]}
                />
              )
            }
            {
              listWorkouts && (
                <BarChart
                  title="Distribuição por Tipo de Avaliaçõe"
                  labels={["ABC", "ABCD", "ABCDE"]}
                  datasets={[
                    {
                      data: [countWorkoutTypes(listWorkouts).ABC],
                      backgroundColor:
                        'rgba(255, 99, 132, 0.8)',
                      label: "ABC"
                    },
                    {
                      data: [countWorkoutTypes(listWorkouts).ABCD],
                      backgroundColor:
                        'rgba(54, 162, 235, 0.8)',
                      label: "ABCD"
                    },
                    {
                      data: [countWorkoutTypes(listWorkouts).ABCDE],
                      backgroundColor:
                        'rgba(255, 206, 86, 0.8)',
                      label: "ABCDE"
                    }
                  ]}
                />
              )
            }
          </div>
        </>

      }
    </Layout>
  );
}
