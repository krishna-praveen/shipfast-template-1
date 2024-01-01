/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";

import { ExerciseInterface } from "@/app/(private)/workouts/register/page";

import { ExerciseSchema } from "@/libs/schema";

interface EditExerciseProps {
  exercise: ExerciseInterface | null;
  type: string; // Inclui o tipo do treino
  onSave: (type: string, exercise: ExerciseInterface) => void;
}

export const EditExercise = ({ exercise, type, onSave }: EditExerciseProps) => {
  const [formData, setFormData] = useState({
    name: "",
    sets: 0,
    repetitions: "",
    videoLink: "",
    observation: ""
  })
  const [error, setError] = useState<Record<string, string>>({});
  const visibleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (exercise) {
      setFormData({
        name: exercise.name,
        sets: exercise.sets,
        repetitions: exercise.repetitions.join(","),
        videoLink: exercise.videoLink,
        observation: exercise.observation
      });
    }
  }, [exercise]);

  const handleSubmit = async (formData: any) => {
    try {
      let repetitionsArray = formData.repetitions.split(",").map(Number);

      let editedExercise = {
        ...formData,
        repetitions: repetitionsArray,
        type
      };

      ExerciseSchema.parse(editedExercise);

      onSave(type, editedExercise);

      setFormData({
        name: "",
        sets: 0,
        repetitions: "",
        videoLink: "",
        observation: ""
      });

      setError({});

      if (visibleRef.current) {
        visibleRef.current.checked = false;
      }
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        const newErrors = error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {} as Record<string, string>);

        setError(newErrors);
      }
    }
  }

  return (
    <>
      <input type="checkbox" id="editExercise" className="modal-toggle" ref={visibleRef} />
      <div className="modal" role="dialog" aria-label="Editar Exercício">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="text-lg font-bold">Editar Exercício</h3>
          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData) }}>
            <input
              type="text"
              placeholder="Workout Name"
              className={`input input-bordered input-sm ${error.name ? 'input-error' : ''}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="flex w-full gap-5">
              <input
                type="number"
                placeholder="Sets"
                className={`input input-bordered input-sm w-full ${error.sets ? 'input-error' : ''}`}
                value={formData.sets}
                onChange={(e) => setFormData({ ...formData, sets: Number(e.target.value) })}
              />
              <input
                type="text"
                placeholder="Repetition"
                className={`input input-bordered input-sm w-full  ${error.repetitions ? 'input-error' : ''}`}
                value={formData.repetitions}
                onChange={(e) => setFormData({ ...formData, repetitions: e.target.value })}
              />
            </div>

            <input
              type="text"
              placeholder="Video Link"
              className={`input input-bordered input-sm ${error.videoLink ? 'input-error' : ''}`}
              value={formData.videoLink}
              onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
            />

            <input
              type="text"
              placeholder="Observation"
              className={`input input-bordered input-sm ${error.observation ? 'input-error' : ''}`}
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
            />

            <div role="alert" className="alert-neutral alert items-start">
              <span>💡</span>
              <span>You can customize the number of repetitions for your training, separating them with commas.
                For example, in a Drop set, you can specify 12, 10, 8 reps for different sets.</span>
            </div>

            <div className="mt-4 flex justify-between">
              <button type="reset" className="btn btn-outline btn-primary" onClick={() => {
                if (visibleRef.current) {
                  visibleRef.current.checked = false;
                }
                setError({});
              }}>Cancel</button>
              <input className="btn btn-primary" type="submit" value={"Save Exercise"} />
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="editExercise">Close</label>
      </div>
    </>
  );
}