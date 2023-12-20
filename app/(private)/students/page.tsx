/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/libs/api";
import Layout from "@/components/Layout";

export const dynamic = "force-dynamic";

enum GenderEnum {
  female = "Feminino",
  male = "Masculino"
}

function StudentInfo({ label, value }: any) {
  return value ? <p className="mb-1"><strong>{label}:</strong> {value}</p> : null;
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Students() {
  const router = useRouter()

  const [students, setStudents] = useState([])
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  useEffect(() => {
    const getStudents = async () => {
      const { data } = await apiClient.get("/students");

      setStudents(data);
    };

    getStudents();
  }, []);

  const calculateAge = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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

      <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" onClick={handleRegister}>
        Registrar aluno
      </button>

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
