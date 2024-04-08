'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CalendarIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'

import { DateRange } from 'react-day-picker';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { ComboBoxInput } from '@/components/ui/Form/ComboBoxInput'
import { Label } from '@/components/ui/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { TopBar } from '@/components/ui/TopBar'
import { ASSESSMENT_TYPE } from '@/constants';
import { useFlowAssessmentsContext } from '@/contexts/FlowAssessments.context';
import { useFlowAssessments } from '@/hooks/useFlowAssessments/useFlowAssessments';
import { useSchema } from '@/hooks/useSchema';
import { useListStudents } from '@/services/hooks/useListStudents';

import { cn } from '@/libs/utils';


type NewAssessmentsProps = Required<z.infer<typeof useSchema.assessments.newAssessments>>;


export default function Assessments() {
  const router = useRouter();
  const pathname = usePathname();

  const { updateFlowAssessments } = useFlowAssessmentsContext();

  const { data: listStudents } = useListStudents({ refetchOnWindowFocus: false });
  const studentsData = listStudents?.map(student => {
    return { label: student.name + ' ' + student.surname, value: student.id }
  }) || [];

  const newAssessmentsMethods = useForm<NewAssessmentsProps>({
    resolver: zodResolver(useSchema.assessments.newAssessments),
  });

  const onSubmitAssessment: SubmitHandler<NewAssessmentsProps> = ({ assessmentType, date, student }) => {
    updateFlowAssessments({
      assessmentType: assessmentType,
      endDate: format(date.to, 'yyyy-MM-dd'),
      startDate: format(date.from, 'yyyy-MM-dd'),
      studentInfo: listStudents.filter(studentInfo => studentInfo.id === student)[0]
    })

    const flow = useFlowAssessments.getValidFlow({ page: pathname, key: assessmentType, initialFlow: true })

    router.push('register/' + flow.nextPage)
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

      <section className='mt-10 flex items-center justify-center xl:min-h-[60vh]'>
        <form className='flex border-spacing-0.5 flex-col items-center rounded-md border-white bg-zinc-800 shadow-md' onSubmit={newAssessmentsMethods.handleSubmit(onSubmitAssessment)}>
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
              <FormField
                control={newAssessmentsMethods.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mt-1 flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className='flex'>
                            <div className='mr-2 flex flex-col'>
                              <Label className='text-md mb-1 font-normal'>Inicio da Avaliação:</Label>
                              <Button
                                type='button'
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value?.from ? (
                                  format(field.value.from, 'dd/MM/yyyy', { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </div>
                            <div className='ml-2 flex flex-col'>
                              <Label className='text-md mb-1 font-normal'>Fim da Avaliação:</Label>
                              <Button
                                type='button'
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value?.to ? (
                                  format(field.value.to, 'dd/MM/yyyy', { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          numberOfMonths={2}
                          pagedNavigation
                          showOutsideDays
                          mode="range"
                          locale={ptBR}
                          selected={field.value as DateRange}
                          onSelect={(e) => field.onChange({ from: e?.from, to: e?.to })}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className='text-md text-red-500' />
                  </FormItem>
                )}
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


