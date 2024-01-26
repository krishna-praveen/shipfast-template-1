"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Layout from "@/components/layout/Layout";

import { useListWorkoutsStudents } from '@/services/hooks/useListWorkoutsStudents';

export const dynamic = "force-dynamic";

export default function Workouts() {
  const [accordionOpened, serAccordionOpened] = useState(-1);
  const router = useRouter()

  const { data: workouts, isLoading } = useListWorkoutsStudents({ refetchOnWindowFocus: false })
  const handleRegister = () => {
    router.replace("/workouts/register")
  }

  const handleAccordion = (studentId: number) => {
    if (accordionOpened === studentId) {
      serAccordionOpened(-1);
    } else {
      serAccordionOpened(studentId);
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
        {!isLoading && workouts.map((studentWorkouts, key) => (
          <div key={key} className="mb-2">
            <div className={`collapse collapse-arrow rounded-box bg-base-200 ${accordionOpened === key && 'collapse-open'}`}>
              <input type="checkbox" className="peer" checked={accordionOpened === key} onChange={() => handleAccordion(key)} />
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
