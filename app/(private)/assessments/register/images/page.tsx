'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button';
import { FileUploadInput } from '@/components/ui/Form/FileUploadInput';
import { TextInput } from '@/components/ui/Form/TextInput'
import { StepperAssessments } from '@/components/ui/StepperAssessments';
import { TopBar } from '@/components/ui/TopBar'

import { ASSESSMENT_TYPE } from '@/constants';
import { useFlowAssessmentsContext } from '@/contexts/FlowAssessments.context';

import { useFlowAssessments } from '@/hooks/useFlowAssessments/useFlowAssessments';
import { useSchema } from '@/hooks/useSchema';


export default function Image() {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split('/').at(-1);


  const { flowAssessments, updateFlowAssessments } = useFlowAssessmentsContext();
  console.log('flowAssessments', flowAssessments)
  useEffect(() => {
    if (!flowAssessments) {
      router.push('/assessments/register');
    }
  }, [flowAssessments, router]);

  const subTitle = ASSESSMENT_TYPE.find(item => item.value === flowAssessments?.assessmentType)?.label;
  const flow = useFlowAssessments.getValidFlow({ page: page, key: flowAssessments?.assessmentType });

  const imageIsRequired = flow?.imagesIsRequired;
  const schemaImage = useSchema.assessments.images(imageIsRequired);
  type SchemaImageProps = Required<z.infer<typeof schemaImage>>;

  const formImagesMethods = useForm<SchemaImageProps>({
    resolver: zodResolver(schemaImage),
  });

  const onSubmit: SubmitHandler<SchemaImageProps> = (data) => {

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
        <form className='flex min-w-[40vw] border-spacing-0.5 flex-col items-center rounded-md border-white bg-zinc-800 shadow-md' onSubmit={formImagesMethods.handleSubmit(onSubmit)}>
          <FormProvider {...formImagesMethods}>
            <div className='mb-2 mt-4 flex w-full flex-col items-center justify-center'>
              <span className='text-xl font-semibold'>Fotos do Aluno</span>
              <span className='text-sm font-light text-zinc-400'>{flowAssessments?.studentInfo?.name + ' ' + flowAssessments?.studentInfo?.surname}</span>
            </div>
            <div className='grid w-full grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4'>

              <FileUploadInput name="front" placeholder='Adicionar' label='Frente' />
              <FileUploadInput name="back" placeholder='Adicionar' label='Costas' />
              <FileUploadInput name="left" placeholder='Adicionar' label='Lado Esquerdo' />
              <FileUploadInput name="right" placeholder='Adicionar' label='Lado Direito' />

              <div className='col-span-4 mt-2 flex justify-between'>
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


