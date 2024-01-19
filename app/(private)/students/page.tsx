/* eslint-disable no-unused-vars */
"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "@/components/layout/Layout";

import apiClient from "@/services/api";

import { calculateAge, formatDate } from "@/libs/date";


export const dynamic = "force-dynamic";

enum GenderEnum {
  female = "Feminino",
  male = "Masculino"
}

function StudentInfo({ label, value }: any) {
  return value ? <p className="mb-1"><strong>{label}:</strong> {value}</p> : null;
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Students() {
  const router = useRouter()
  const supabase = createClientComponentClient();

  const [students, setStudents] = useState([])
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [studentLimit, setStudentLimit] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      const session = await supabase.auth.getSession()
      const userId = session.data.session.user.id

      const { data } = await apiClient.get("/students", { params: { userId } });

      setStudents(data);
    };

    getStudents();
  }, [supabase]);

  useEffect(() => {
    const fetchStudentLimit = async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session.user.id

      try {
        const { data } = await apiClient.get('/plans/limit', { params: { userId } });

        setStudentLimit(data.limits.student);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }

        toast.error('Não foi possível obter o limite de alunos.')
      }
    };

    fetchStudentLimit();
  }, [supabase])

  useEffect(() => {
    setIsLimitReached(students.length >= studentLimit);
  }, [students, studentLimit]);

  const handleRegister = () => {
    router.replace("/students/register")
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
      <h1 className="text-3xl font-extrabold md:text-4xl">Alunos</h1>

      <div className="mt-8 flex flex-row items-center space-x-2">
        <div className={`${isLimitReached ? 'tooltip tooltip-right' : ''}`} data-tip={`${isLimitReached ? 'Limite de alunos atingido. Por favor, atualize seu plano para adicionar mais alunos.' : ''}`}>
          <button
            className={`btn hover:bg-indigo-600 hover:text-white ${isLimitReached ? 'btn-disabled' : ''}`}
            onClick={handleRegister}
          >
            Registrar aluno
          </button>
        </div>

        <p>{students.length}/{studentLimit}</p>
      </div>

      <div className="overflow-x-auto pt-4">
        {students?.map((student: { id: string, name: string, surname: string, birth_date: string, gender: keyof typeof GenderEnum, state: string, city: string, email: string, phone: string }) => (
          <div key={student.id} className="mb-2">
            <div className={`collapse collapse-arrow rounded-box bg-base-200 ${openAccordionId === student.id ? 'collapse-open' : ''}`}>
              <input type="checkbox" className="peer" checked={openAccordionId === student.id} onChange={() => handleAccordion(student.id)} />
              <div className="collapse-title text-xl font-medium">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="col-span-1">{student.name} {student.surname}</div>
                </div>
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <StudentInfo label="Nome completo" value={`${student.name} ${student.surname}`} />
                    <StudentInfo label="Data de nascimento" value={formatDate(student.birth_date)} />
                    <StudentInfo label="Idade" value={`${calculateAge(student.birth_date)} anos`} />
                    <StudentInfo label="Sexo" value={GenderEnum[student.gender]} />
                  </div>
                  <div>
                    <StudentInfo label="Estado" value={student.state} />
                    <StudentInfo label="Cidade" value={student.city} />
                    <StudentInfo label="Email" value={student.email} />
                    <StudentInfo label="Telefone" value={student.phone} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
