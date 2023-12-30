"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";

import apiClient from "@/libs/api";


export const dynamic = "force-dynamic";

interface StudentWorkouts {
  studentFullName: string;
  workouts: Array<{
    id: string;
    description: string;
  }>;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Array<StudentWorkouts>>([]);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data } = await apiClient.get<Array<StudentWorkouts>>("/workouts/students");

      setWorkouts(data);
    }

    fetchWorkouts()
  }, [])

  const handleRegister = () => {
    router.replace("/workouts/register")
  }

  const handleAccordion = (studentId: string) => {
    if (openAccordionId === studentId) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(studentId);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold md:text-4xl">Treinos</h1>

      <div className="mt-8 flex flex-row items-center space-x-2">
        <button className="btn hover:bg-indigo-600 hover:text-white" onClick={handleRegister}>
          Registrar Treino
        </button>
      </div>

      <div className="overflow-x-auto pt-4">
        {workouts.map((studentWorkouts) => (
          <div key={setWorkouts.name} className="mb-2">
            <div className={`collapse collapse-arrow rounded-box bg-base-200 ${openAccordionId === studentWorkouts.studentFullName ? 'collapse-open' : ''}`}>
              <input type="checkbox" className="peer" checked={openAccordionId === studentWorkouts.studentFullName} onChange={() => handleAccordion(studentWorkouts.studentFullName)} />
              <div className="collapse-title text-xl font-medium">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="col-span-1">{studentWorkouts.studentFullName}</div>
                </div>
              </div>

              <div className="collapse-content">
                <div className="grid grid-cols-1 gap-4">
                  {studentWorkouts.workouts.map((workout) => (
                    <div key={workout.id} className="flex w-full flex-row place-content-between rounded-lg bg-base-300 p-4">
                      <p className="mb-1"><strong>{workout.description}</strong></p>
                      <Link href={`/workouts/${workout.id}`} className="mb-1 hover:underline"><strong>Ver Treino</strong></Link>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
