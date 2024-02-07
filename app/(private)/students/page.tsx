/* eslint-disable no-unused-vars */
"use client"

import { useRouter } from "next/navigation";

import Layout from "@/components/layout/Layout";

import { Button } from "@/components/ui/Button";
import { useListStudents } from '@/services/hooks/useListStudents';

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const dynamic = "force-dynamic";

export default function Students() {
  const router = useRouter()

  const { data } = useListStudents({
    refetchOnWindowFocus: false,
  });

  const handleRegister = () => {
    router.replace("/students/register")
  }

  return (
    <Layout>
      <div className="fle flex-col space-y-20">
        <div className="flex flex-row items-center justify-between space-y-4 md:space-x-4 md:space-y-0">
          <div className='flex flex-col space-y-4'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Aluno</h1>
          </div>
          <Button onClick={handleRegister} className='bg-secondary-500 hover:bg-secondary-600'>
            Registrar aluno
          </Button>
        </div>

        <div className="space-y-2 overflow-x-auto pt-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
}
