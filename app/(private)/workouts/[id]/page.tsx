// 'use client';

// import { useState } from "react";

// import Layout from "@/components/layout/Layout";

// import { useListWorkoutsById } from '@/services/hooks/useListWorkoutsById';

// import { ExerciseInterface, WorkoutInterface } from '@/types/models/listWorkoutsById.model';

// import { AddExercise } from "@/components/workouts/AddExercise";
// import { CardExercise } from "@/components/workouts/CardExercise";
// import { EditExercise } from "@/components/workouts/EditExercise";
// import { TopBar } from "@/components/workouts/TopBar";



// export default function Workout({ params }: { params: { id: string } }) {
//   const [workoutTabs, setWorkoutTabs] = useState("ABC");
//   const [selectedWorkoutTab, setSelectedWorkoutTab] = useState("A");
//   const [exercises, setExercises] = useState<{ [key: string]: ExerciseInterface[] }>({});
//   const [workout, setWorkout] = useState<WorkoutInterface>();
//   const [editingExercise, setEditingExercise] = useState({ exercise: null, tab: '', index: -1 });

//   const { id: workoutId } = params

//   const addExercise = (exercise: ExerciseInterface) => {
//     setExercises(prevExercises => ({
//       ...prevExercises,
//       [selectedWorkoutTab]: [...(prevExercises[selectedWorkoutTab] || []), exercise]
//     }));
//   };

//   const deleteExercise = (tab: string, index: number) => {
//     setExercises(prevExercises => ({
//       ...prevExercises,
//       [tab]: prevExercises[tab].filter((_, i) => i !== index),
//     }));
//   };

//   const editExercise = (exercise: ExerciseInterface, tab: string, index: number) => {
//     setEditingExercise({ exercise, tab, index });
//   };

//   const saveEditedExercise = (type: string, editedExercise: ExerciseInterface) => {
//     setExercises(prevExercises => ({
//       ...prevExercises,
//       [type]: prevExercises[type].map((ex, i) =>
//         i === editingExercise.index ? editedExercise : ex
//       ),
//     }));

//     setEditingExercise({ exercise: null, tab: '', index: -1 });
//   };

//   useListWorkoutsById({
//     workoutId, options: {
//       enabled: !!workoutId,
//       onSuccess: (data) => {
//         const { exercises, ...rest } = data
//         setExercises(exercises || {});
//         setWorkout({ ...rest, exercises });
//       }
//     }
//   })

//   return (
//     <Layout>

//       <TopBar title="Treino" workout={workout} onChangeTabsType={(typeTabs: string) => setWorkoutTabs(typeTabs)} tabsType={workoutTabs} exercises={exercises} />

//       <div className="bg-base-100 w-full">
//         <div role="tablist" aria-label="Workouts" className="tabs block border-primary px-10">
//           {
//             workoutTabs.split('').map((workoutTab, index) => (
//               <input key={index} type="radio" name="workout_tabs" onChange={() => setSelectedWorkoutTab(workoutTab)} role="tab" className="tab h-auto px-8 py-5 font-semibold ![border-color:var(--secondary)] checked:border-b-2 checked:text-secondary" aria-label={`Treino ${workoutTab}`} defaultChecked={index === 0} />
//             ))
//           }
//         </div>

//         <div className="bg-image flex flex-col gap-8 p-10">

//           <div className="flex items-center gap-5">
//             <h2 className="text-2xl font-bold">Exercícios</h2>
//             <label htmlFor="addExercise" className="btn btn-outline btn-primary">Adicionar Exercício</label>
//           </div>

//           <div className="flex flex-wrap justify-between">
//             {
//               (exercises[selectedWorkoutTab] || []).map((exercise, index) => (
//                 <CardExercise
//                   key={index}
//                   {...exercise}
//                   onEditExercise={() => editExercise(exercise, selectedWorkoutTab, index)}
//                   onDeleteExercise={() => deleteExercise(selectedWorkoutTab, index)}
//                 />
//               ))
//             }
//           </div>
//         </div>

//       </div>

//       <AddExercise onAddExercise={addExercise} selectedWorkoutTab={selectedWorkoutTab} />

//       <EditExercise exercise={editingExercise.exercise} onSave={saveEditedExercise} type={selectedWorkoutTab} />
//     </Layout>
//   )
// }

import React, { FC } from 'react'

export const page: FC = () => {
  return (
    <div>
      page
    </div>
  )
}
