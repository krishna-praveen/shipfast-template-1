"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "@/components/layout/Layout";

import apiClient from "@/libs/api";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Assessments() {
  const router = useRouter()
  const supabase = createClientComponentClient();

  const [students, setStudents] = useState([])
  const [assessmentsByStudentId, setAssessmentsByStudentId] = useState([])
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

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

  useEffect(() => {
    if (students.length === 0 || !students) {
      return
    }

    const getAssessmentsByStudentId = async () => {
      const { data, error } = await supabase.from("assessments").select("*").in('student_id', students.map(student => student.id)).throwOnError()
      console.log({ data: JSON.stringify(data) })

      if (error) {
        toast.error("Erro ao buscar avaliações por aluno. Entre em contato com o suporte.")
      }

      setAssessmentsByStudentId(data)
    }

    getAssessmentsByStudentId()
  }, [supabase, students])


  const handleRegister = () => {
    router.replace("/assessments/register")
  }

  const handleAccordion = (studentId: string) => {
    const assessmentsForStudent = assessmentsByStudentId.filter(assessment => assessment.student_id === studentId);
    if (assessmentsForStudent.length === 0) return;

    setOpenAccordionId(openAccordionId === studentId ? null : studentId);
  };

  const formatNumber = (value: number) => {
    return Number(value.toFixed(2));
  };

  const renderAssessmentDetails = (assessments: any[]) => {
    const assessmentMeasureTranslations: { [key: string]: string } = {
      calf: "Panturrilha",
      chest: "Peito",
      thigh: "Coxa",
      axilla: "Axila",
      height: "Altura",
      weight: "Peso",
      abdomen: "Abdômen",
      triceps: "Tríceps",
      subscapular: "Subescapular"
    };

    const assessmentResultTranslations: { [key: string]: string } = {
      bmr: "Taxa Metabólica Basal",
      fatMass: "Massa Gorda",
      leanMass: "Massa Magra",
      bodyDensity: "Densidade Corporal",
      idealWeightMax: "Peso Ideal Máximo",
      idealWeightMin: "Peso Ideal Mínimo",
      sumOfSkinfolds: "Soma das Dobras Cutâneas",
      idealBodyFatMax: "Gordura Corporal Ideal Máxima",
      idealBodyFatMin: "Gordura Corporal Ideal Mínima",
      bodyFatPercentage: "Porcentagem de Gordura Corporal"
    };

    const bodyMeasurementTranslations: { [key: string]: string } = {
      hip: "Quadril",
      chest: "Peito",
      neck: "Pescoço",
      waist: "Cintura",
      abdomen: "Abdômen",
      shoulder: "Ombro",
      right: "Direito",
      left: "Esquerdo",
      arm: "Braço",
      forearm: "Antebraço",
      thigh: "Coxa",
      calf: "Panturrilha"
    };

    const translateKey = (key: string, translations: { [key: string]: string }) => {
      return translations[key] || key;
    };

    const renderBodyMeasurement = (bodyMeasurement: any) => {
      const translatedBodyMeasurements = Object.entries(bodyMeasurement)
        .filter(([key]) => ['hip', 'chest', 'neck', 'waist', 'abdomen', 'shoulder'].includes(key))
        .map(([key, value]) => (
          <li key={key}>{`${translateKey(key, bodyMeasurementTranslations)}: ${value}`}</li>
        ));

      const renderSideMeasurements = (side: 'right' | 'left') => {
        return (
          <div>
            <strong>{translateKey(side, bodyMeasurementTranslations)}</strong>
            <ul>
              {Object.entries(bodyMeasurement[side]).map(([innerKey, innerValue]) => (
                <li key={innerKey}>{`${translateKey(innerKey, bodyMeasurementTranslations)}: ${innerValue}`}</li>
              ))}
            </ul>
          </div>
        );
      };

      return (
        <div>
          <ul>{translatedBodyMeasurements}</ul>
          <div className="mt-4 flex flex-col md:flex-row md:gap-x-16">
            {renderSideMeasurements('right')}
            {renderSideMeasurements('left')}
          </div>
        </div>
      );
    };

    return assessments.map(assessment => (
      <div className="accordion" key={assessment.id}>
        <div className="accordion-item">
          <div className="accordion-body space-y-4">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <p><strong>Data de início:</strong> {formatDate(assessment.start_date)}</p>
                <p><strong>Data de fim:</strong> {formatDate(assessment.end_date)}</p>
                <p><strong>Tipo de Avaliação:</strong> {assessment.assessment_type === "pollock_7" ? "Pollock de 7 dobras" : "Pollock de 3 dobras"}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <p><strong>Medidas da Avaliação:</strong></p>
                <ul>
                  {Object.entries(assessment.assessment_measures).map(([key, value]) => (
                    <li key={key}>{`${translateKey(key, assessmentMeasureTranslations)}: ${value}`}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <p><strong>Resultado da Avaliação:</strong></p>
                <ul>
                  {Object.entries(assessment.assessment_result).map(([key, value]) => {
                    const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
                    return (
                      <li key={key}>{`${translateKey(key, assessmentResultTranslations)}: ${formattedValue}`}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <strong>Medidas Corporais:</strong>
                {renderBodyMeasurement(assessment.body_measurement)}
              </div>
            </div>

            <div className="divider" />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold md:text-4xl">Avaliações</h1>
      <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" onClick={handleRegister}>
        Registrar avaliações
      </button>

      <div className="overflow-x-auto pt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome do Aluno</th>
              <th>Avaliações</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <>
                <tr key={student.id} onClick={() => handleAccordion(student.id)} className="cursor-pointer">
                  <td>{student.name} {student.surname}</td>
                  <td>{assessmentsByStudentId.filter(assessment => assessment.student_id === student.id).length} avaliações</td>
                </tr>
                {openAccordionId === student.id && (
                  <tr>
                    <td colSpan={2}>
                      {renderAssessmentDetails(
                        assessmentsByStudentId.filter(assessment => assessment.student_id === student.id)
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
