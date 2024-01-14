"use client"

import { User as UserSupabase, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BookText, Dumbbell, User } from "lucide-react";
import { useEffect, useState } from "react";

import { BarChart } from "@/components/features/dashboard/BarChart";
import { Channels } from "@/components/features/dashboard/Channels";
import DoughnutChart from "@/components/features/dashboard/DoughnutChart";
import Layout from "@/components/layout/Layout";
import { CardStats } from "@/components/ui/CardStats";
import { Modal } from "@/components/ui/Modal";

import apiClient from "@/libs/api";

export const dynamic = "force-dynamic";

interface AssessmentMeasures {
  chest: number;
  thigh: number;
  height: number;
  weight: number;
  abdomen: number;
}

interface BodySideMeasurements {
  arm: number;
  calf: number;
  thigh: number;
  forearm: number;
}

interface BodyMeasurement {
  hip: number;
  left: BodySideMeasurements;
  neck: number;
  chest: number;
  right: BodySideMeasurements;
  waist: number;
  abdomen: number;
  shoulder: number;
}

interface AssessmentResult {
  bmr: number;
  fatMass: number;
  leanMass: number;
  bodyDensity: number;
  idealWeightMax: number;
  idealWeightMin: number;
  sumOfSkinfolds: number;
  idealBodyFatMax: number;
  idealBodyFatMin: number;
  bodyFatPercentage: number;
}

interface Assessment {
  id: string;
  startDate: string;
  endDate: string;
  studentId: string;
  assessmentType: "pollock_3" | "pollock_7";
  assessmentMeasures: AssessmentMeasures;
  bodyMeasurement: BodyMeasurement;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  assessmentResult: AssessmentResult;
}

interface Student {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  gender: 'male' | 'female';
  state: string;
  city: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userId: string;
}

interface Exercise {
  name: string;
  sets: number;
  type: string;
  videoLink: string;
  observation: string;
  repetitions: number[];
}

interface Exercises {
  [key: string]: Array<Exercise>;
}

interface Workout {
  id: string;
  description: string;
  phase: number;
  assessmentId: string;
  goal: string;
  type: 'ABC' | 'ABCD' | 'ABCDE';
  exercises: Exercises;
  studentId: string;
  userId: string;
  createdAt: string
  updatedAt: string | null;
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Home() {
  const supabase = createClientComponentClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserSupabase>();
  const [students, setStudents] = useState<Array<Student>>();
  const [assessments, setAssessments] = useState<Array<Assessment>>();
  const [workouts, setWorkouts] = useState<Array<Workout>>();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const profile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .filter("has_access", "eq", true)
        .single();

      if (!profile.data) {
        setIsModalOpen(true)
      }

      if (session.user) {
        setUser(session.user)
      }
    }

    fetchProfile()
  }, [supabase])

  useEffect(() => {
    const fetchStudents = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      const { data: students } = await apiClient.get("/students", { params: { userId: session.user.id } })

      setStudents(students)
    }

    fetchStudents()
  }, [supabase])

  useEffect(() => {
    const fetchAssessments = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      const { data: assessments }: { data: Array<Assessment> } = await apiClient.get("/assessments", { params: { userId: session.user.id } })

      const sortedAndFormattedAssessments = assessments
        .map((assessment: Assessment) => ({
          ...assessment,
          endDate: new Date(assessment.endDate)
        }))
        .sort((a: { endDate: Date }, b: { endDate: Date }) => a.endDate.getTime() - b.endDate.getTime())
        .map((assessment: any) => ({
          ...assessment,
          endDate: assessment.endDate.toISOString().split('T')[0].replace(/-/g, '/')
        }));

      setAssessments(sortedAndFormattedAssessments)
    }

    fetchAssessments()
  }, [supabase])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      const { data: workouts }: { data: Array<Workout> } = await apiClient.get("/workouts", { params: { userId: session.user.id } })

      const sortedWorkouts = workouts
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

      setWorkouts(sortedWorkouts)
    }

    fetchWorkouts()
  }, [supabase])

  const handleBilling = async () => {
    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-portal",
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
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

  return (
    <Layout>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Faça sua inscrição!" isStatic={true}>
        <div className="space-y-4">
          <p>Agora que finalizamos o seu cadastro, o que você de escolhermos o plano que você mais se identificou?</p>
          <button onClick={handleBilling} className="btn btn-primary">Escolher Plano</button>
        </div>
      </Modal>

      <h1 className="text-3xl font-extrabold md:text-4xl">Dashboard</h1>
      <h2 className="mt-2 text-xl">Olá, {user?.user_metadata?.name}</h2>
      <h3 className="mt-2 text-base">Bem vindo de volta ao Pump! {JSON.stringify(process.env)}</h3>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CardStats
          colorIndex={3}
          title="Estudantes"
          description="Total"
          value={students?.length.toString()}
          icon={<User />}
        />

        <CardStats
          colorIndex={3}
          title="Avaliações"
          description="Total"
          value={assessments?.length.toString()}
          icon={<BookText />}
        />

        <CardStats
          colorIndex={3}
          title="Treinos"
          description="Total"
          value={workouts?.length.toString()}
          icon={<Dumbbell />}
        />
      </div>

      <div className=" grid grid-cols-3 gap-6 lg:grid-cols-3">
        {
          students && (
            <DoughnutChart
              title="Distribuição por Gênero"
              labels={["Masculino", "Feminino"]}
              datasets={[{
                data: [countByGenderMale(students), countByGenderFemale(students)],
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
          assessments && (
            <Channels
              title="Avaliações Próximas a Expirarem"
              data={assessments.map((assessment: Assessment) => ({
                studentId: `${students?.find((student: any) => student.id === assessment.studentId)?.name} ${students?.find((student: any) => student.id === assessment.studentId)?.surname}`,
                endDate: assessment.endDate
              }))}
              columns={["Nome do Aluno", "Data"]}
            />
          )
        }
        {
          students && (
            <DoughnutChart
              title="Distribuição por Tipo de Avaliação"
              labels={["Pollock de 3 Dobras", "Pollock de 7 Dobras"]}
              datasets={[{
                data: [countBy3PollockAssessmentType(assessments), countBy7PollockAssessmentType(assessments)],
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
          workouts && (
            <Channels
              title="Últimos Treinos Adicionados"
              data={workouts.map((workout: Workout) => ({
                studentId: `${students?.find((student: any) => student.id === workout.studentId)?.name} ${students?.find((student: any) => student.id === workout.studentId)?.surname}`,
                createdAt: workout.createdAt.split('T')[0].replace(/-/g, '/'),
              }))}
              columns={["Nome do Aluno", "Data"]}
            />
          )
        }
        {
          workouts && (
            <BarChart
              title="Distribuição por Tipo de Avaliaçõe"
              labels={["ABC", "ABCD", "ABCDE"]}
              datasets={[
                {
                  data: [countWorkoutTypes(workouts).ABC],
                  backgroundColor:
                    'rgba(255, 99, 132, 0.8)',
                  label: "ABC"
                },
                {
                  data: [countWorkoutTypes(workouts).ABCD],
                  backgroundColor:
                    'rgba(54, 162, 235, 0.8)',
                  label: "ABCD"
                },
                {
                  data: [countWorkoutTypes(workouts).ABCDE],
                  backgroundColor:
                    'rgba(255, 206, 86, 0.8)',
                  label: "ABCDE"
                }
              ]}
            />
          )
        }
      </div>
    </Layout>
  );
}
