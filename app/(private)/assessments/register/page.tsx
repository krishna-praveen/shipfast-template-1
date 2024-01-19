/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from 'framer-motion'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import Layout from "@/components/layout/Layout";

import { Modal } from "@/components/ui/Modal";

import { AssessmentInterface } from "@/components/workouts/TopBar";

import apiClient from "@/services/api";

import { AssessmentTypeEnum } from "@/libs/enums/assessment-type-enum";
import { FormDataSchema } from "@/libs/schema";


export const dynamic = "force-dynamic";

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Alunos',
    fields: ['students']
  },
  {
    id: 'Step 2',
    name: 'Tipo de Avaliação',
    fields: ['assessmentType']
  },
  {
    id: 'Step 3',
    name: 'Medidas Cutâneas',
    fields: ["assessmentMeasures.weight", "assessmentMeasures.height", "assessmentMeasures.thigh", "assessmentMeasures.chest", "assessmentMeasures.triceps", "assessmentMeasures.calf", "assessmentMeasures.abdomen", "assessmentMeasures.suprailiac", "assessmentMeasures.subscapular", "assessmentMeasures.axilla"]
  },
  {
    id: 'Step 4',
    name: 'Período',
    fields: ['startDate', 'endDate']
  },
  {
    id: 'Step 5',
    name: 'Medidas Corporais',
    fields: []
  },
  {
    id: 'Step 6',
    name: 'Revisão',
    fields: []
  },
]

const assessmentTypeMapper = {
  [AssessmentTypeEnum.POLLOCK_3]: "Pollock de 3 dobras",
  [AssessmentTypeEnum.POLLOCK_7]: "Pollock de 7 dobras"
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Register() {
  const supabase = createClientComponentClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [planLimit, setPlanLimit] = useState<any>({ limits: { assessment: 0 } });
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      bodyMeasurement: {
        neck: 0,
        abdomen: 0,
        chest: 0,
        hip: 0,
        shoulder: 0,
        waist: 0,
        left: {
          arm: 0,
          calf: 0,
          forearm: 0,
          thigh: 0
        },
        right: {
          arm: 0,
          calf: 0,
          forearm: 0,
          thigh: 0
        }
      }
    }
  })

  const [userId, setUserId] = useState("")
  const [students, setStudents] = useState([])
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        const { id } = session.data.session.user;
        setUserId(id);
      }
    };

    getSession();
  }, [supabase]);

  useEffect(() => {
    if (!userId) {
      return
    }

    const getStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq("user_id", userId)
        .throwOnError()

      if (error) {
        toast.error("Erro ao buscar alunos. Entre em contato com o suporte.")
      }

      setStudents(data)
    }

    getStudents()
  }, [supabase, userId])

  const formatBirthDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    let formatted = input.replace(/[^\d]/g, "");

    if (formatted.length >= 3 && formatted.length <= 4) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    } else if (formatted.length > 4) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4) + "/" + formatted.slice(4, 8);
    }

    setValue(event.target.name as keyof Inputs, formatted, { shouldValidate: true });
  };

  const createAssessment = async (data: any) => {
    await fetch("/api/assessments", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  const handleForm: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data)
      reset()
      await createAssessment({ ...data, userId })
      router.replace('/assessments')
    } catch (error) {
      toast.error(`Erro ao criar a avaliação, entre em contato com o suporte. ${JSON.stringify(error)}`)
    }
  }

  const handleBack = () => {
    router.replace("/assessments")
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step + 1);
    } else if (currentStep === steps.length - 1) {
      await handleSubmit(handleForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  const renderPollock3 = () => {
    const student = students.find(student => student.id === getValues('studentId'))
    const { gender } = student

    if (gender === 'male') {
      return (
        <>
          <div>
            <label htmlFor="assessmentMeasures.chest" className="label">Peito</label>
            <input
              type='text'
              id='assessmentMeasures.chest'
              {...register('assessmentMeasures.chest', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.chest?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.chest.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.abdomen" className="label">Abdômen</label>
            <input
              type='text'
              id='assessmentMeasures.abdomen'
              {...register('assessmentMeasures.abdomen', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.abdomen?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.abdomen.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.thigh" className="label">Coxa</label>
            <input
              type='text'
              id='assessmentMeasures.thigh'
              {...register('assessmentMeasures.thigh', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.thigh?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.thigh.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.weight" className="label">Peso</label>
            <input
              type='text'
              id='assessmentMeasures.weight'
              {...register('assessmentMeasures.weight', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.weight?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.weight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.height" className="label">Altura</label>
            <input
              type='text'
              id='assessmentMeasures.height'
              {...register('assessmentMeasures.height', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.height?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.height.message}
              </p>
            )}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            <label htmlFor="assessmentMeasures.triceps" className="label">Tríceps</label>
            <input
              type='text'
              id='assessmentMeasures.triceps'
              {...register('assessmentMeasures.triceps', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.triceps?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.triceps.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.suprailiac" className="label">Supra-ilíaca</label>
            <input
              type='text'
              id='assessmentMeasures.suprailiac'
              {...register('assessmentMeasures.suprailiac', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.suprailiac?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.suprailiac.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.thigh" className="label">Coxa</label>
            <input
              type='text'
              id='assessmentMeasures.thigh'
              {...register('assessmentMeasures.thigh', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.thigh?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.thigh.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.weight" className="label">Peso</label>
            <input
              type='text'
              id='assessmentMeasures.weight'
              {...register('assessmentMeasures.weight', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.weight?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.weight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.height" className="label">Altura</label>
            <input
              type='text'
              id='assessmentMeasures.height'
              {...register('assessmentMeasures.height', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.height?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.height.message}
              </p>
            )}
          </div>
        </>
      )
    }
  }

  const renderPollock7 = () => {
    const student = students.find(student => student.id === getValues('studentId'))
    const { gender } = student

    if (gender === 'male') {
      return (
        <>
          <div>
            <label htmlFor="assessmentMeasures.chest" className="label">Peito</label>
            <input
              type='text'
              id='assessmentMeasures.chest'
              {...register('assessmentMeasures.chest', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.chest?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.chest.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.abdomen" className="label">Abdômen</label>
            <input
              type='text'
              id='assessmentMeasures.abdomen'
              {...register('assessmentMeasures.abdomen', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.abdomen?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.abdomen.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.thigh" className="label">Coxa</label>
            <input
              type='text'
              id='assessmentMeasures.thigh'
              {...register('assessmentMeasures.thigh', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.thigh?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.thigh.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.subscapular" className="label">Subescapular</label>
            <input
              type='text'
              id='assessmentMeasures.subscapular'
              {...register('assessmentMeasures.subscapular', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.subscapular?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.subscapular.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.axilla" className="label">Axila</label>
            <input
              type='text'
              id='assessmentMeasures.axilla'
              {...register('assessmentMeasures.axilla', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.axilla?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.axilla.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.calf" className="label">Panturrilha</label>
            <input
              type='text'
              id='assessmentMeasures.calf'
              {...register('assessmentMeasures.calf', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.calf?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.calf.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.triceps" className="label">Tríceps</label>
            <input
              type='text'
              id='assessmentMeasures.triceps'
              {...register('assessmentMeasures.triceps', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.triceps?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.triceps.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.weight" className="label">Peso</label>
            <input
              type='text'
              id='assessmentMeasures.weight'
              {...register('assessmentMeasures.weight', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.weight?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.weight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.height" className="label">Altura</label>
            <input
              type='text'
              id='assessmentMeasures.height'
              {...register('assessmentMeasures.height', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.height?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.height.message}
              </p>
            )}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            <label htmlFor="assessmentMeasures.suprailiac" className="label">Supra-ilíaca</label>
            <input
              type='text'
              id='assessmentMeasures.suprailiac'
              {...register('assessmentMeasures.suprailiac', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.suprailiac?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.suprailiac.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.abdomen" className="label">Abdômen</label>
            <input
              type='text'
              id='assessmentMeasures.abdomen'
              {...register('assessmentMeasures.abdomen', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.abdomen?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.abdomen.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.thigh" className="label">Coxa</label>
            <input
              type='text'
              id='assessmentMeasures.thigh'
              {...register('assessmentMeasures.thigh', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.thigh?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.thigh.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.subscapular" className="label">Subescapular</label>
            <input
              type='text'
              id='assessmentMeasures.subscapular'
              {...register('assessmentMeasures.subscapular', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.subscapular?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.subscapular.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.axilla" className="label">Axila</label>
            <input
              type='text'
              id='assessmentMeasures.axilla'
              {...register('assessmentMeasures.axilla', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.axilla?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.axilla.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.calf" className="label">Panturrilha</label>
            <input
              type='text'
              id='assessmentMeasures.calf'
              {...register('assessmentMeasures.calf', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.calf?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.calf.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.triceps" className="label">Tríceps</label>
            <input
              type='text'
              id='assessmentMeasures.triceps'
              {...register('assessmentMeasures.triceps', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.triceps?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.triceps.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.weight" className="label">Peso</label>
            <input
              type='text'
              id='assessmentMeasures.weight'
              {...register('assessmentMeasures.weight', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.weight?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.weight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assessmentMeasures.height" className="label">Altura</label>
            <input
              type='text'
              id='assessmentMeasures.height'
              {...register('assessmentMeasures.height', { valueAsNumber: true })}
              className='input input-bordered w-full placeholder:opacity-60'
            />
            {errors.assessmentMeasures?.height?.message && (
              <p className='mt-2 text-sm text-red-400'>
                {errors.assessmentMeasures?.height.message}
              </p>
            )}
          </div>
        </>
      )
    }
  }

  const renderReview = () => {
    const studentId = getValues('studentId');
    const assessmentType = getValues('assessmentType');
    const assessmentMeasures = getValues('assessmentMeasures');
    const bodyMeasurement = getValues('bodyMeasurement');
    const startDate = getValues('startDate');
    const endDate = getValues('endDate');

    const measureTranslations: { [key: string]: string } = {
      chest: "Peito",
      triceps: "Tríceps",
      suprailiac: "Supra-ilíaca",
      thigh: "Coxa",
      abdomen: "Abdômen",
      calf: "Panturrilha",
      axilla: "Axila",
      subscapular: "Subescapular",
      weight: "Peso",
      height: "Altura"
    };

    const bodyMeasureTranslations: { [key: string]: string } = {
      neck: "Pescoço",
      shoulder: "Ombro",
      chest: "Peito",
      waist: "Cintura",
      abdomen: "Abdômen",
      hip: "Quadril",
      right: "Direito",
      left: "Esquerdo",
      arm: "Braço",
      forearm: "Antebraço",
      thigh: "Coxa",
      calf: "Panturrilha"
    };

    const selectedStudent = students.find(student => student.id === studentId);

    return (
      <div className='mt-2'>
        <div className="flex flex-row space-x-8">

          <div className="flex flex-col">
            <div>
              <strong>Nome do Aluno:</strong> {selectedStudent?.name} {selectedStudent?.surname}
            </div>
            <div>
              <strong>Tipo de Avaliação:</strong> {assessmentTypeMapper[assessmentType]}
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <strong>Data de Início:</strong> {startDate}
            </div>
            <div>
              <strong>Data de Fim:</strong> {endDate}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div>
          <strong>Medidas da Avaliação ({assessmentTypeMapper[assessmentType]})</strong>
          <ul>
            {assessmentMeasures ? (
              Object.entries(assessmentMeasures).map(([key, value]) => {
                const translatedKey = measureTranslations[key as keyof typeof measureTranslations];
                return <li key={key}>{translatedKey}: {value}</li>;
              })
            ) : (
              <p>Sem medidas da avaliação para exibir.</p>
            )}
          </ul>
        </div>

        <div className="divider"></div>

        <div>
          <strong>Medidas Corporais:</strong>
          <ul>
            {Object.entries(bodyMeasurement).map(([key, value]) => {
              if (typeof value !== 'object') {
                const translatedKey = bodyMeasureTranslations[key as keyof typeof bodyMeasureTranslations];
                return <li key={key}>{translatedKey}: {value}</li>;
              }
              return null;
            })}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <strong>Direito</strong>
              <ul>
                {Object.entries(bodyMeasurement.right).map(([innerKey, innerValue]) => {
                  const translatedInnerKey = bodyMeasureTranslations[innerKey as keyof typeof bodyMeasureTranslations];
                  return <li key={`right-${innerKey}`}>{translatedInnerKey}: {innerValue}</li>;
                })}
              </ul>
            </div>
            <div>
              <strong>Esquerdo</strong>
              <ul>
                {Object.entries(bodyMeasurement.left).map(([innerKey, innerValue]) => {
                  const translatedInnerKey = bodyMeasureTranslations[innerKey as keyof typeof bodyMeasureTranslations];
                  return <li key={`left-${innerKey}`}>{translatedInnerKey}: {innerValue}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  const handleStudent = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const studentId = event.target.value

    const session = await supabase.auth.getSession()
    const userId = session.data.session.user.id

    const { data: assessments } = await apiClient.get<Array<AssessmentInterface>>(`/assessments/${studentId}/student`, { params: { userId } })

    const { data: plans } = await apiClient.get(`/plans/limit`, { params: { userId } })

    if (plans.limits.assessment === assessments.length) {
      setIsModalOpen(true)
      setPlanLimit(plans)
      setLimitReached(true)
      return
    }

    setValue('studentId', studentId)
  }

  return (
    <Layout>
      <div className="flex flex-row items-center space-x-4">
        <ArrowLeft className="cursor-pointer hover:text-indigo-800" onClick={handleBack} />
        <h1 className="text-3xl font-extrabold md:text-4xl">Registrar Avaliação</h1>
      </div>

      <section className='mt-16 flex flex-row justify-center space-x-32'>
        <nav aria-label='Progress'>
          <ul className="steps steps-vertical">
            {steps.map((step, index) => (
              <li key={step.name} className={`step ${currentStep >= index ? 'step-primary' : ''}`}>
                {step.name}
              </li>
            ))}
          </ul>
        </nav>

        <form className='py-2' onSubmit={handleSubmit(handleForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className='text-base font-semibold'>
                Alunos
              </h2>
              <p className='mt-1 text-sm'>
                Selecione um aluno
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <div className='mt-2'>
                    <select
                      id="studentId"
                      {...register('studentId')}
                      className='select select-bordered w-full max-w-xs'
                      defaultValue={0}
                      onChange={handleStudent}
                    >
                      <option disabled key={0} value={0}>
                        Selecionar um Aluno
                      </option>
                      {students.map((student) => (
                        <option
                          key={student.id}
                          value={student.id}
                        >
                          {student.name} {student.surname}
                        </option>
                      ))}
                    </select>
                    {errors.studentId?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.studentId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className='text-base font-semibold'>
                Tipo de Avaliação
              </h2>
              <p className='mt-1 text-sm'>
                O tipo de avaliação que será aplicado.
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <div className='mt-2'>
                    <select
                      id='assessmentType'
                      {...register('assessmentType', { required: true })}
                      className='select select-bordered w-full max-w-xs'
                    >
                      <option
                        key={AssessmentTypeEnum.POLLOCK_3}
                        value={AssessmentTypeEnum.POLLOCK_3}
                      >
                        {assessmentTypeMapper['pollock_3']}
                      </option>
                      <option
                        key={AssessmentTypeEnum.POLLOCK_7}
                        value={AssessmentTypeEnum.POLLOCK_7}
                      >
                        {assessmentTypeMapper['pollock_7']}
                      </option>
                    </select>
                    {errors.assessmentType?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.assessmentType.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h2 className='text-base font-semibold'>
                Medidas Cutâneas ({getValues("assessmentType") === AssessmentTypeEnum.POLLOCK_3 ? "Pollock de 3 Dobras" : "Pollock de 7 Dobras"})
              </h2>
              <p className='mt-1 text-sm'>
                Insira as dobras cutâneas.
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <div className='mt-2'>
                    {
                      getValues("assessmentType") === AssessmentTypeEnum.POLLOCK_3 ? renderPollock3() : renderPollock7()
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h2 className='text-base font-semibold'>
                Período
              </h2>
              <p className='mt-1 text-sm'>
                Selecione o período da avaliação.
              </p>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <div className='mt-2'>
                    <div>
                      <label htmlFor="startDate" className="label">Data de Início</label>
                      <input
                        type='text'
                        id='startDate'
                        {...register('startDate')}
                        className='input input-bordered w-full placeholder:opacity-60'
                        onChange={formatBirthDate}
                      />
                      {errors.startDate?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="endDate" className="label">Data de Fim</label>
                      <input
                        type='text'
                        id='endDate'
                        {...register('endDate')}
                        className='input input-bordered w-full placeholder:opacity-60'
                        onChange={formatBirthDate}
                      />
                      {errors.endDate?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h2 className='text-base font-semibold'>
                Medidas Corporais
              </h2>
              <p className='mt-1 text-sm'>
                Insira as medidas corporais do aluno.
              </p>
              <div className='mt-10 sm:grid-cols-6'>
                <div className='flex flex-row space-x-4 sm:col-span-3'>
                  <div className='mt-2'>
                    <div>
                      <label htmlFor="bodyMeasurement.neck" className="label">Pescoço</label>
                      <input
                        type='text'
                        id='bodyMeasurement.neck'
                        {...register('bodyMeasurement.neck', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.neck?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.neck.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.shoulder" className="label">Ombro</label>
                      <input
                        type='text'
                        id='bodyMeasurement.shoulder'
                        {...register('bodyMeasurement.shoulder', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.shoulder?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.shoulder.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.chest" className="label">Peito</label>
                      <input
                        type='text'
                        id='bodyMeasurement.chest'
                        {...register('bodyMeasurement.chest', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.chest?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.chest.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.waist" className="label">Cintura</label>
                      <input
                        type='text'
                        id='bodyMeasurement.waist'
                        {...register('bodyMeasurement.waist', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.waist?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.waist.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.abdomen" className="label">Abdômen</label>
                      <input
                        type='text'
                        id='bodyMeasurement.abdomen'
                        {...register('bodyMeasurement.abdomen', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.abdomen?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.abdomen.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.hip" className="label">Quadril</label>
                      <input
                        type='text'
                        id='bodyMeasurement.hip'
                        {...register('bodyMeasurement.hip', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.hip?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.hip.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div>
                      <label htmlFor="bodyMeasurement.right.arm" className="label">Braço direito</label>
                      <input
                        type='text'
                        id='bodyMeasurement.right.arm'
                        {...register('bodyMeasurement.right.arm', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.right?.arm?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.right?.arm?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.right.forearm" className="label">Antebraço direito</label>
                      <input
                        type='text'
                        id='bodyMeasurement.right.forearm'
                        {...register('bodyMeasurement.right.forearm', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.right?.forearm?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.right?.forearm?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.right.thigh" className="label">Coxa direita</label>
                      <input
                        type='text'
                        id='bodyMeasurement.right.thigh'
                        {...register('bodyMeasurement.right.thigh', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.right?.thigh?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.right?.thigh?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.right.calf" className="label">Panturrilha direita</label>
                      <input
                        type='text'
                        id='bodyMeasurement.right.calf'
                        {...register('bodyMeasurement.right.calf', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.right?.calf?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.right?.calf?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div>
                      <label htmlFor="bodyMeasurement.left.arm" className="label">Braço esquerdo</label>
                      <input
                        type='text'
                        id='bodyMeasurement.left.arm'
                        {...register('bodyMeasurement.left.arm', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.left?.arm?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.left?.arm?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.left.forearm" className="label">Antebraço esquerdo</label>
                      <input
                        type='text'
                        id='bodyMeasurement.left.forearm'
                        {...register('bodyMeasurement.left.forearm', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.left?.forearm?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.left?.forearm?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.left.thigh" className="label">Coxa esquerdo</label>
                      <input
                        type='text'
                        id='bodyMeasurement.left.thigh'
                        {...register('bodyMeasurement.left.thigh', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.left?.thigh?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.left?.thigh?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bodyMeasurement.left.calf" className="label">Panturrilha esquerdo</label>
                      <input
                        type='text'
                        id='bodyMeasurement.left.calf'
                        {...register('bodyMeasurement.left.calf', { valueAsNumber: true })}
                        className='input input-bordered w-full placeholder:opacity-60'
                      />
                      {errors.bodyMeasurement?.left?.calf?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.bodyMeasurement?.left?.calf?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h2 className='text-base font-semibold'>
                Revisão
              </h2>
              <p className='mt-1 text-sm'>
                Revise as informações.
              </p>
              <div className='mt-10'>
                <div className='sm:col-span-3'>
                  <div className='mt-2'>
                    {renderReview()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </form>

        <div className='mt-8 pt-5'>
          <div className='flex flex-col space-y-24'>
            <button
              type='button'
              onClick={prev}
              disabled={currentStep === 0}
              className='btn btn-primary'
            >
              Voltar
            </button>
            <button
              type='button'
              onClick={next}
              className={`btn btn-primary ${currentStep === steps.length - 1 ? 'btn-success' : ''}`}
              disabled={limitReached === true}
            >
              {currentStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
            </button>
          </div>
        </div>
      </section>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Atenção!"
      >
        <div className="space-y-4">
          <p>O seu plano só permite cadastrar <strong>{planLimit.limits.assessment} avaliações</strong> por aluno.</p>
          <p>Deseja <strong>atualizar</strong> seu plano?</p>
          <button onClick={handleBilling} className="btn btn-primary">Escolher novo Plano</button>
        </div>
      </Modal>
    </Layout>
  );
}
