'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button';
import { ComboBoxInput } from '@/components/ui/Form/ComboBoxInput'
import { TopBar } from '@/components/ui/TopBar'
import { ASSESSMENT_TYPE } from '@/constants';
import { useSchema } from '@/hooks/useSchema';
import { useListStudents } from '@/services/hooks/useListStudents';

type NewAssessmentsProps = Required<z.infer<typeof useSchema.newAssessments>>;


export default function Assessments() {
  const router = useRouter();
  const { data: listStudents } = useListStudents({ refetchOnWindowFocus: false });
  const studentsData = listStudents?.map(student => {
    return { label: student.name + ' ' + student.surname, value: student.id }
  }) || [];

  const newAssessmentsMethods = useForm<NewAssessmentsProps>({
    resolver: zodResolver(useSchema.newAssessments),
  });

  const onSubmitAssessment: SubmitHandler<NewAssessmentsProps> = (data) => {
    console.log(data)
    router.push('/assessments')
  }

  return (
    <Layout>
      <TopBar.Root>
        <TopBar.Navigation>
          <TopBar.Group>
            <TopBar.Title>
              Nova Avaliação
            </TopBar.Title>
            <TopBar.SubTitle>
              Passos iniciais
            </TopBar.SubTitle>
          </TopBar.Group>
        </TopBar.Navigation>
      </TopBar.Root>

      <section className='mt-10 flex min-h-[60vh] items-center justify-center'>
        <form className='flex min-w-[27vw] border-spacing-0.5 flex-col items-center rounded-md border-white bg-zinc-800 shadow-md' onSubmit={newAssessmentsMethods.handleSubmit(onSubmitAssessment)}>
          <FormProvider {...newAssessmentsMethods}>
            <header className='flex w-full flex-col p-5'>
              <b className='font-semibold'>Iniciando nova avaliação</b>
              <span className='font-light text-zinc-300'>Informe qual tipo de avaliação e aluno o qual deseja avaliar:</span>
            </header>
            <div className='grid w-full grid-cols-1 gap-4 px-5'>
              <ComboBoxInput
                name='student'
                label='Aluno'
                data={studentsData}
                classNameContainer='col-span-1'
                placeholder='Selecione uma opção'
              />
              <ComboBoxInput
                name='assessmentType'
                label='Tipo de Avaliação'
                data={ASSESSMENT_TYPE}
                classNameContainer='col-span-1'
                placeholder='Selecione uma opção'
              />
              <div className='col-span-1 mb-4 mt-2 flex justify-end'>
                <Button variant="secondary" className='flex items-center px-4' type="submit" >Iniciar Avaliação</Button>
              </div>
            </div>
          </FormProvider>
        </form>
      </section>

    </Layout>
  )
}


