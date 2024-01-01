"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";

import { ExerciseInterface } from "@/app/(private)/workouts/register/page";

import apiClient from "@/libs/api";
import { WorkoutSchema } from "@/libs/schema";

export interface WorkoutInterface {
  id: string;
  studentId: string;
  userId: string;
  assessmentId: string;
  description: string;
  phase: number;
  goal: string;
  type: string;
  exercises: Exercises;
}

interface Exercises {
  [key: string]: ExerciseDetail[];
}

interface ExerciseDetail {
  name: string;
  sets: number;
  type: string;
  videoLink: string;
  observation: string;
  repetitions: number[];
}

interface StudentInterface {
  id: string
  userId: string
  name: string
  surname: string
}
interface AssessmentInterface {
  id: string
  userId: string
  studentId: string
  createdAt: string
}

type TopBarProps = {
  onChangeTabsType: Function;
  tabsType: string;
  workout?: WorkoutInterface
  exercises: { [key: string]: Array<ExerciseInterface> }
}

const validTabs = ["A", "B", "C", "D", "E"];

export const TopBar = ({ onChangeTabsType, tabsType, exercises, workout }: TopBarProps) => {
  const [students, setStudents] = useState<Array<StudentInterface>>([]);
  const [assessmentId, setAssessmentId] = useState<string>();
  const [studentId, setStudentId] = useState<string>();
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    description: null,
    phase: null,
    goal: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchStudents = async () => {
      const session = await supabase.auth.getSession()
      const userId = session.data.session.user.id

      try {
        const { data } = await apiClient.get("/students", { params: { userId } })

        setStudents(data)
      } catch (error) {
        toast.error("Erro ao buscar alunos. Entre em contato com o suporte.")
      }
    }

    fetchStudents()
  }, [supabase])

  useEffect(() => {
    if (workout) {
      setFormData({
        description: workout.description || '',
        phase: workout.phase || '',
        goal: workout.goal || ''
      });
      setStudentId(workout.studentId);
      setAssessmentId(workout.assessmentId);
    }
  }, [workout]);

  const handleStudent = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const studentId = event.target.value

    const session = await supabase.auth.getSession()
    const userId = session.data.session.user.id

    const { data } = await apiClient.get<Array<AssessmentInterface>>(`/assessments/${studentId}/student`, { params: { userId } })

    const assessment = data[0]

    setStudentId(studentId)
    setAssessmentId(assessment.id)
  }

  const handleChangeTabs = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const tabsType = event.target.value

    onChangeTabsType(tabsType);
  }

  const handleSubmit = async (formData: any) => {
    try {
      let formNewData = {
        ...formData,
        type: tabsType,
        assessmentId,
        studentId,
        exercises: { ...exercises }
      };

      WorkoutSchema.parse(formNewData);

      const exerciseKeys = Object.keys(formNewData.exercises);
      const invalidTabs = exerciseKeys.filter(key => !validTabs.includes(key));

      if (invalidTabs.length > 0) {
        throw new Error(`Invalid tabs: ${invalidTabs.join(", ")}`);
      }

      setErrors({});

      const session = await supabase.auth.getSession()
      const userId = session.data.session.user.id

      if (workout) {
        await apiClient.put(`/workouts/${workout.id}`, formNewData, { params: { userId } });
        toast.success("Treino atualizado com sucesso!");
        return
      }

      await apiClient.post("/workouts", formNewData, { params: { userId } });

      toast.success("Treino salvo com sucesso!");
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        const newErrors = error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {} as Record<string, string>);

        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 px-10 py-8">
      <div className="flex w-full flex-wrap justify-between gap-5">
        <div className="flex flex-col gap-5">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/workouts">Treinos</a>
              </li>
              <li>Novo Treino</li>
            </ul>
          </div>

          <h1 className="text-4xl font-bold">Novo Treino</h1>

          <input
            type="text"
            placeholder="Descrição do treino"
            className={`input input-bordered input-sm w-full md:w-80 ${errors.description ? 'select-error' : 'border-white'}`}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <button className="btn btn-outline">Cancelar</button>
          <button className="btn btn-primary" onClick={() => handleSubmit(formData)}>Salvar Treino</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Aluno</span>
          </div>
          {
            workout ? (
              <select
                className={`select select-bordered select-sm w-full max-w-xs ${errors.assessmentId ? 'select-error' : 'border-white'}`}
                value={studentId}
                onChange={handleStudent}
              >
                <option disabled value={0}>Selecionar um Aluno</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} {student.surname}
                  </option>
                ))}
              </select>

            ) : (
              <select
                className={`select select-bordered select-sm w-full max-w-xs ${errors.assessmentId ? 'select-error' : 'border-white'}`}
                defaultValue={0}
                onChange={handleStudent}
              >
                <option disabled key={0} value={0}>
                  Selecionar um Aluno
                </option>
                {
                  students.map((student) => {
                    return (
                      <option key={student.id} value={student.id}>
                        {student.name} {student.surname}
                      </option>
                    )
                  })
                }
              </select>
            )
          }
        </label>

        <label className="form-control w-[132px]">
          <div className="label">
            <span className="label-text">Fase</span>
          </div>
          <input
            type="text"
            value={formData.phase}
            onChange={(e) => setFormData({ ...formData, phase: Number(e.target.value) })}
            className={`input input-bordered input-sm w-full ${errors.phase ? 'select-error' : 'border-white'}`}
            placeholder="Qual fase?"
          />
        </label>

        <label className="form-control w-[136px]">
          <div className="label">
            <span className="label-text">Tipo de Treino</span>
          </div>
          {
            workout ? (
              <select
                className={`select select-bordered select-sm w-full max-w-xs ${errors.type ? 'select-error' : 'border-white'}`}
                value={tabsType}
                onChange={handleChangeTabs}>
                {["ABC", "ABCD", "ABCDE"].map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>

            ) : (
              <select className={`select select-bordered select-sm w-full max-w-xs ${errors.type ? 'select-error' : 'border-white'}`} onChange={handleChangeTabs}>
                {
                  ["ABC", "ABCD", "ABCDE"].map((tabsType, index) => (
                    <option key={index} value={tabsType}>
                      {tabsType}
                    </option>
                  ))
                }
              </select>
            )
          }
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Objetivo do Treino</span>
          </div>
          <input
            type="text"
            className={`input input-bordered input-sm w-full ${errors.goal ? 'select-error' : 'border-white'}`}
            placeholder="Qual o objetivo?"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}