'use client';
// import { useState } from "react";

import Layout from "@/components/layout/Layout";
import { Button } from '@/components/ui/Button'
import { TopBar } from "@/components/ui/TopBar";

export interface ExerciseInterface {
  name: string;
  sets: number;
  repetitions: Array<number>;
  videoLink: string;
  observation: string;
}

export default function Register() {
  // const [workoutTabs, setWorkoutTabs] = useState<string>("ABC");
  // const [selectedWorkoutTab, setSelectedWorkoutTab] = useState<string>("A");
  // const [exercises, setExercises] = useState<{ [key: string]: ExerciseInterface[] }>({});
  // const [editingExercise, setEditingExercise] = useState({ exercise: null, tab: '', index: -1 });

  // const addExercise = (exercise: ExerciseInterface) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [selectedWorkoutTab]: [...(prevExercises[selectedWorkoutTab] || []), exercise]
  //   }));
  // };

  // const deleteExercise = (tab: string, index: number) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [tab]: prevExercises[tab].filter((_, i) => i !== index),
  //   }));
  // };

  // const editExercise = (exercise: ExerciseInterface, tab: string, index: number) => {
  //   setEditingExercise({ exercise, tab, index });
  // };

  // const saveEditedExercise = (type: string, editedExercise: ExerciseInterface) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [type]: prevExercises[type].map((ex, i) =>
  //       i === editingExercise.index ? editedExercise : ex
  //     ),
  //   }));

  //   setEditingExercise({ exercise: null, tab: '', index: -1 });
  // };

  return (
    <Layout>

      <TopBar.Root>
        <TopBar.Title>
          Novo Treino
        </TopBar.Title>
        <TopBar.Action className='flex items-center'>
          <Button variant='outline_secundary' className='mr-4'>Cancelar</Button>
          <Button variant='secondary' className='py-5'>Salvar</Button>
        </TopBar.Action>
      </TopBar.Root>


    </Layout>
  )
}
