"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "@/components/layout/Layout";

import apiClient from "@/services/api";

export const dynamic = "force-dynamic";

export default function Assessments() {
  const router = useRouter()
  const supabase = createClientComponentClient();

  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState('')
  const [assessments, setAssessments] = useState<any[]>([])
  const [assessmentId, setAssessmentId] = useState('')
  const [bodyMeasurementOpenAccordionId, setBodyMeasurementOpenAccordionId] = useState<string | null>(null);
  const [assessmentMeasurementOpenAccordionId, setAssessmentMeasurementOpenAccordionId] = useState<string | null>(null);
  const [assessmentResultOpenAccordionId, setAssessmentResultOpenAccordionId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const getStudents = async () => {
      const session = await supabase.auth.getSession()
      const userId = session.data.session.user.id

      try {
        const { data } = await apiClient.get("/students", { params: { userId } })
        setStudents(data)
      } catch (error) {
        toast.error("Erro ao buscar alunos. Entre em contato com o suporte.")
      }
    }

    getStudents()
  }, [supabase])

  const handleRegister = () => {
    router.replace("/assessments/register")
  }

  const handleStudent = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const studentId = event.target.value

    setStudentId(studentId)

    const session = await supabase.auth.getSession()
    const userId = session.data.session.user.id

    const { data } = await apiClient.get(`/assessments/${studentId}/student`, { params: { userId } })
    setAssessments(data)
  }

  const handleAssessment = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()

    const assessmentId = event.target.value

    setAssessmentId(assessmentId)
  }

  const handleBodyMeasurementAccordion = (id: string) => {
    if (bodyMeasurementOpenAccordionId === id) {
      setBodyMeasurementOpenAccordionId(null);
    } else {
      setBodyMeasurementOpenAccordionId(id);
    }
  };

  const handleAssessmentMeasurementAccordion = (id: string) => {
    if (assessmentMeasurementOpenAccordionId === id) {
      setAssessmentMeasurementOpenAccordionId(null);
    } else {
      setAssessmentMeasurementOpenAccordionId(id);
    }
  };

  const handleAssessmentResultAccordion = (id: string) => {
    if (assessmentResultOpenAccordionId === id) {
      setAssessmentResultOpenAccordionId(null);
    } else {
      setAssessmentResultOpenAccordionId(id);
    }
  };

  const formatNumber = (value: number) => {
    return Number(value.toFixed(2));
  };

  const formatAssessmentPeriod = (startDate: string, endDate: string) => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear();

    return `${startMonth} - ${endMonth} (${year})`;
  }

  const renderAssessmentDetails = (assessments: Array<any>) => {
    const assessment = assessments.find(assessment => assessment.id === assessmentId);

    const renderBodyMeasurement = (assessment: any) => {
      return (
        <div className="mt-4">
          <div className={`collapse-arrow rounded-box bg-base-200 collapse ${bodyMeasurementOpenAccordionId === assessment.id + "body-measurement" ? 'collapse-open' : ''}`}>
            <input type="checkbox" className="peer" checked={bodyMeasurementOpenAccordionId === assessment.id + "body-measurement"} onChange={() => handleBodyMeasurementAccordion(assessment.id + "body-measurement")} />
            <div className="collapse-title text-xl font-medium">
              <div className="mb-2 grid grid-cols-1">
                <h1 className="text-xl font-medium">Medidas do Corpo</h1>
              </div>
            </div>

            <div className="collapse-content">
              <div className="space-y-2">
                <div className="flex flex-row space-x-4">
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.neck} cm</h2>
                    <p>Pescoço</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.shoulder} cm</h2>
                    <p>Ombros</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.chest} cm</h2>
                    <p>Peito</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.waist} cm</h2>
                    <p>Cintura</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.hip} cm</h2>
                    <p>Quadril</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.abdomen} cm</h2>
                    <p>Abdômen</p>
                  </div>
                </div>

                <div className="flex flex-row place-content-between space-x-8">
                  <div className="w-full rounded-md">
                    <h1 className="text-xl font-medium">Direito:</h1>
                    <div className="flex flex-row space-x-4">
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.right.forearm} cm</h2>
                        <p>Antebraço</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.right.arm} cm</h2>
                        <p>Braço</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.right.thigh} cm</h2>
                        <p>Coxa</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.right.calf} cm</h2>
                        <p>Panturrilha</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-md">
                    <h1 className="text-xl font-medium">Esquerdo:</h1>
                    <div className="flex flex-row space-x-4">
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.left.forearm} cm</h2>
                        <p>Antebraço</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.left.arm} cm</h2>
                        <p>Braço</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.left.thigh} cm</h2>
                        <p>Coxa</p>
                      </div>
                      <div className="bg-base-100 w-full rounded-md p-2">
                        <h2 className="text-2xl font-semibold">{assessment.bodyMeasurement.left.calf} cm</h2>
                        <p>Panturrilha</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderAssessmentMeasurement = (assessment: any) => {
      return (
        <div className="mt-4">
          <div className={`collapse-arrow rounded-box bg-base-200 collapse ${assessmentMeasurementOpenAccordionId === assessment.id + "assessment-measurement" ? 'collapse-open' : ''}`}>
            <input type="checkbox" className="peer" checked={assessmentMeasurementOpenAccordionId === assessment.id + "assessment-measurement"} onChange={() => handleAssessmentMeasurementAccordion(assessment.id + "assessment-measurement")} />
            <div className="collapse-title text-xl font-medium">
              <div className="mb-2 grid grid-cols-1">
                <h1 className="text-xl font-medium">Medidas da Avaliação</h1>
              </div>
            </div>

            <div className="collapse-content">
              <div className="flex flex-row space-x-4">
                <div className="bg-base-100 w-full rounded-md p-2">
                  <h2 className="text-2xl font-semibold">{assessment.assessmentMeasures.height}</h2>
                  <p>Altura</p>
                </div>
                <div className="bg-base-100 w-full rounded-md p-2">
                  <h2 className="text-2xl font-semibold">{assessment.assessmentMeasures.weight} kg</h2>
                  <p>Peso</p>
                </div>
                <div className="bg-base-100 w-full rounded-md p-2">
                  <h2 className="text-2xl font-semibold">{assessment.assessmentMeasures.thigh} cm</h2>
                  <p>Chest</p>
                </div>
                <div className="bg-base-100 w-full rounded-md p-2">
                  <h2 className="text-2xl font-semibold">{assessment.assessmentMeasures.thigh} cm</h2>
                  <p>Coxa</p>
                </div>
                <div className="bg-base-100 w-full rounded-md p-2">
                  <h2 className="text-2xl font-semibold">{assessment.assessmentMeasures.abdomen} cm</h2>
                  <p>Abdômen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const renderAssessmentResult = (assessment: any) => {
      return (
        <div className="mt-4">
          <div className={`collapse-arrow rounded-box bg-base-200 collapse ${assessmentResultOpenAccordionId === assessment.id + "assessment-result" ? 'collapse-open' : ''}`}>
            <input type="checkbox" className="peer" checked={assessmentResultOpenAccordionId === assessment.id + "assessment-result"} onChange={() => handleAssessmentResultAccordion(assessment.id + "assessment-result")} />

            <div className="collapse-title text-xl font-medium">
              <div className="mb-2 grid grid-cols-1">
                <h1 className="text-xl font-medium">Resultado da Avaliação</h1>
              </div>
            </div>

            <div className="collapse-content">
              <div className="flex flex-row place-content-between space-x-4">
                <div className="flex w-full flex-col space-y-4">
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentMeasures.weight)} kg</h2>
                    <p>Peso Atual</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.idealWeightMax)} kg</h2>
                    <p>Peso Máximo Ideal</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.idealWeightMin)} kg</h2>
                    <p>Peso Mínimo Ideal</p>
                  </div>
                </div>

                <div className="flex w-full flex-col space-y-4">
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.bodyFatPercentage)}%</h2>
                    <p>Massa Gorda Atual</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.idealBodyFatMax)}%</h2>
                    <p>Máximo de Massa Gorda Ideal</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.idealBodyFatMin)}%</h2>
                    <p>Mínimo de Massa Gorda Ideal</p>
                  </div>
                </div>

                <div className="flex w-full flex-col space-y-4">
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.fatMass)} kg</h2>
                    <p>Massa Gorda</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.leanMass)} kg</h2>
                    <p>Massa Magra</p>
                  </div>
                  <div className="bg-base-100 w-full rounded-md p-2">
                    <h2 className="text-2xl font-semibold">{formatNumber(assessment.assessmentResult.bmr)} kcal</h2>
                    <p>Taxa Metabólica Basal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    };

    return (
      <div>
        <div className="flex flex-row place-content-between items-center">
          <div className="flex flex-col space-y-2">
            <label className="text text-sm">Início da Avaliação</label>
            <input className="input input-bordered input-sm" type="text" value={formatDate(assessment.startDate)} disabled />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text text-sm">Fim da Avaliação</label>
            <input className="input input-bordered input-sm" type="text" value={formatDate(assessment.endDate)} disabled />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text text-sm">Tipo de Avaliação</label>
            <input className="input input-bordered input-sm" type="text" value={assessment.assessmentType === "pollock_7" ? "Pollock de 7 dobras" : "Pollock de 3 dobras"} disabled />
          </div>
        </div>

        {renderBodyMeasurement(assessment)}

        {renderAssessmentMeasurement(assessment)}

        {renderAssessmentResult(assessment)}
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold md:text-4xl">Avaliações</h1>
      <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" onClick={handleRegister}>
        Registrar avaliação
      </button>

      <div className="space-y-4 overflow-x-auto pt-4">
        <div className="flex flex-row space-x-8">
          <div>
            <h1 className="pb-2 text-base">Selecione um aluno</h1>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              defaultValue={0}
              onChange={handleStudent}
            >
              <option disabled key={0} value={0}>
                Aluno
              </option>
              {students.map((student) => {
                return (
                  <option key={student.id} value={student.id}>
                    {student.name} {student.surname}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <h1 className="pb-2 text-base">Selecione uma avaliação</h1>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              defaultValue={0}
              disabled={studentId === ''}
              onChange={handleAssessment}
            >
              <option disabled key={0} value={0}>
                Avaliação
              </option>
              {assessments.map((assessment, index) => {
                const periodString = formatAssessmentPeriod(assessment.startDate, assessment.endDate);
                return (
                  <option key={index} value={assessment.id}>
                    {periodString}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Informações da Avaliação</h1>

          {
            assessmentId === '' ? (
              <div className="flex items-center justify-center">
                <div className="card bg-base-200 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Atenção!</h2>
                    <p>Selecione um <strong>Aluno</strong> e uma <strong>Avaliação</strong> para visualizar os dados.</p>
                  </div>
                </div>
              </div>
            ) : (
              renderAssessmentDetails(assessments)
            )
          }
        </div>
      </div>
    </Layout>
  );
}
