'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/Form/TextInput'
import { StepperAssessments } from '@/components/ui/StepperAssessments';
import { TopBar } from '@/components/ui/TopBar'

import { ASSESSMENT_TYPE } from '@/constants';
import { useFlowAssessmentsContext } from '@/contexts/FlowAssessments.context';

import { useFlowAssessments } from '@/hooks/useFlowAssessments/useFlowAssessments';
import { usePayload } from '@/hooks/usePayload/usePayload';
import { useSchema } from '@/hooks/useSchema';


export default function Assessments() {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split('/').at(-1);

  const { flowAssessments, updateFlowAssessments } = useFlowAssessmentsContext();
  useEffect(() => {
    if (!flowAssessments) {
      router.push('/assessments/register');
    }
  }, [flowAssessments, router]);

  const subTitle = ASSESSMENT_TYPE.find(item => item.value === flowAssessments?.assessmentType)?.label;

  const isMale = flowAssessments?.studentInfo?.gender === 'male';
  const schemaPollock3 = useSchema.assessments.pollock_3(isMale);

  type SchemaPollock3Props = Required<z.infer<typeof schemaPollock3>>;

  const flow = useFlowAssessments.getValidFlow({ page: page, key: flowAssessments?.assessmentType });

  const formPollock3Methods = useForm<SchemaPollock3Props>({
    resolver: zodResolver(schemaPollock3),
  });

  const onSubmitAssessment: SubmitHandler<SchemaPollock3Props> = (data) => {
    const filledProps = usePayload.assessments.replaceObjetoStringToNumeric(data);

    updateFlowAssessments({
      ...flowAssessments,
      assessmentMeasures: {
        ...filledProps
      }
    })

    router.push(flow.nextPage)
  }

  return (
    <Layout>
      <TopBar.Root>
        <TopBar.Navigation>
          <TopBar.Group>
            <TopBar.Title>
              Avaliação
            </TopBar.Title>
            <TopBar.SubTitle>
              {subTitle}
            </TopBar.SubTitle>
          </TopBar.Group>
        </TopBar.Navigation>
      </TopBar.Root>

      <section className='mt-10 flex min-h-[60vh] flex-col items-center justify-center'>
        <form className='flex min-w-[40vw] border-spacing-0.5 flex-col items-center rounded-md border-white bg-zinc-800 shadow-md' onSubmit={formPollock3Methods.handleSubmit(onSubmitAssessment)}>
          <FormProvider {...formPollock3Methods}>
            <div className='mb-2 mt-4 flex w-full items-center justify-center'>
              <span className='text-xl font-semibold'>Medidas - Pollock 3 dobras</span>
            </div>
            <div className='grid w-full grid-cols-1 gap-4 p-5 md:grid-cols-2'>
              <TextInput
                name='weight'
                label='Peso'
                type='number'
                classNameContainer='col-span-1'
                className='my-1 border border-white focus:border-0'
                placeholder='Peso (kg)'
              />
              <TextInput
                name='height'
                label='Altura'
                type='number'
                classNameContainer='col-span-1'
                className='my-1 border border-white focus:border-0'
                placeholder='Altura (m)'
              />
              {
                isMale && (
                  <>
                    <TextInput
                      name='chest'
                      label='Peito'
                      type='number'
                      classNameContainer='col-span-1'
                      className='my-1 border border-white focus:border-0'
                      placeholder='Peito (cm)'
                    />
                    <TextInput
                      name='abdomen'
                      label='Abdômen'
                      type='number'
                      classNameContainer='col-span-1'
                      className='my-1 border border-white focus:border-0'
                      placeholder='Abdômen (cm)'
                    />
                  </>
                )}
              {
                !isMale && (
                  <>
                    <TextInput
                      name='suprailiac'
                      label='Supra-ilíaca'
                      type='number'
                      classNameContainer='col-span-1'
                      className='my-1 border border-white focus:border-0'
                      placeholder='Supra-ilíaca (cm)'
                    />
                    <TextInput
                      name='triceps'
                      label='Tríceps'
                      type='number'
                      classNameContainer='col-span-1'
                      className='my-1 border border-white focus:border-0'
                      placeholder='Tríceps (cm)'
                    />
                  </>
                )}
              <TextInput
                name='thigh'
                label='Coxa'
                type='number'
                classNameContainer='col-span-1'
                className='my-1 border border-white focus:border-0'
                placeholder='Coxa (cm)'
              />
              <div className='col-span-2 mt-2 flex justify-between'>
                <Button variant="outline_secundary" className='flex items-center bg-zinc-800 px-4' type="button" onClick={() => router.back()} >Voltar</Button>
                <Button variant="secondary" className='flex items-center px-4' type="submit">Avançar</Button>
              </div>
            </div>
          </FormProvider>
        </form>
        <StepperAssessments pathname={page} assessmentType={flowAssessments?.assessmentType} className='mt-3' />
      </section>

    </Layout>
  )
}


