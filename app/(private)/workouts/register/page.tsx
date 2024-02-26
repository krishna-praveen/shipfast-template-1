'use client';
// import { useState } from "react";


import { zodResolver } from '@hookform/resolvers/zod';

import { Lightbulb, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { z } from 'zod';

import Layout from "@/components/layout/Layout";
import { Tooltip } from '@/components/Tooltip';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { CalendarInput } from '@/components/ui/Form/CalendarInput';
import { ComboBoxInput } from '@/components/ui/Form/ComboBoxInput';
import { TextAreaInput } from '@/components/ui/Form/TextAreaInput';
import { TextInput } from '@/components/ui/Form/TextInput';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/TabsAlternative';
import { TopBar } from "@/components/ui/TopBar";
import { ExerciseDisplay } from '@/components/workouts/ExerciseDisplay';
import { NoResults } from '@/components/workouts/NoResults';
import { DAYS_WORKOUT, DAYS_WORKOUT_RANGE } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { useSchema } from '@/hooks/useSchema';
import { useListStudents } from '@/services/hooks/useListStudents';

type NewWorkoutProps = Required<z.infer<typeof useSchema.newWorkout>>;
type NewExerciseProps = Required<z.infer<typeof useSchema.newExercise>>;

export interface ExerciseInterface {
  name: string;
  sets: number;
  repetitions: Array<number>;
  videoLink: string;
  observation: string;
  rest: string;
}

const initalTabs = ['A', 'B', 'C'];

export default function Register() {
  const dontShowTips = useLocalStorage.getDataByKey({ key: useLocalStorage.keys.DONT_SHOW_TIPS }) || false;
  const [workoutTabs, setWorkoutTabs] = useState(initalTabs);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [selectedWorkoutTab, setSelectedWorkoutTab] = useState(initalTabs[0]);
  const [exercisesDisplay, setExercisesDisplay] = useState<{ [key: string]: ExerciseInterface[] }>();

  const { data: listStudents } = useListStudents({ refetchOnWindowFocus: false });
  const studentsData = listStudents?.map(student => {
    return { label: student.name + ' ' + student.surname, value: student.id }
  }) || [];


  const workoutInfoMethods = useForm<NewWorkoutProps>({
    resolver: zodResolver(useSchema.newWorkout),
  });
  const newExerciseMethods = useForm<NewExerciseProps>({
    resolver: zodResolver(useSchema.newExercise),
  });
  // const [workoutTabs, setWorkoutTabs] = useState<string>("ABC");
  // const [selectedWorkoutTab, setSelectedWorkoutTab] = useState<string>("A");
  // const [exercises, setExercises] = useState<{ [key: string]: ExerciseInterface[] }>({});
  // const [editingExercise, setEditingExercise] = useState({ exercise: null, tab: '', index: -1 });

  // const addExercise = (exercise: ExerciseInterface) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [selectedWorkoutTab]: [...(prevExercises[selectedWorkoutTab] || []), exercise]
  //   }));
  // };

  // const deleteExercise = (tab: string, index: number) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [tab]: prevExercises[tab].filter((_, i) => i !== index),
  //   }));
  // };

  // const editExercise = (exercise: ExerciseInterface, tab: string, index: number) => {
  //   setEditingExercise({ exercise, tab, index });
  // };

  // const saveEditedExercise = (type: string, editedExercise: ExerciseInterface) => {
  //   setExercises(prevExercises => ({
  //     ...prevExercises,
  //     [type]: prevExercises[type].map((ex, i) =>
  //       i === editingExercise.index ? editedExercise : ex
  //     ),
  //   }));

  //   setEditingExercise({ exercise: null, tab: '', index: -1 });
  // };

  const handleOpenModal = () => {
    newExerciseMethods.reset({});
    setIsOpenModal(true);
  }
  const handleCloseModal = () => {
    newExerciseMethods.clearErrors();
    setIsOpenModal(false);
  }

  const handleAddNewTabOnOrder = () => {
    setWorkoutTabs(prevTabs => {
      const asciiCodeLastPosition = prevTabs.at(-1).charCodeAt(0);
      const nextCodeAlpha = String.fromCharCode(asciiCodeLastPosition + 1);
      setSelectedWorkoutTab(nextCodeAlpha);
      return [...prevTabs, nextCodeAlpha];
    });
  }



  const handleOnSubmitWorkoutInfo: SubmitHandler<NewWorkoutProps> = (data) => {
    console.log(data);
  }
  const handleOnSubmitNewExercise: SubmitHandler<NewExerciseProps> = ({ name, observation, repetitions, rest, sets, videoLink }) => {
    setExercisesDisplay(prevState => ({
      ...prevState,
      [selectedWorkoutTab]: [...(prevState?.[selectedWorkoutTab] || []), {
        name: name,
        sets: Number(sets.replace(/\s/g, '')),
        repetitions: repetitions ? repetitions.split(",").map(Number) : [],
        rest: rest,
        videoLink: videoLink,
        observation: observation
      }]
    }));

    handleCloseModal();
  }

  return (
    <Layout>

      <TopBar.Root>
        <TopBar.Title>
          Novo Treino
        </TopBar.Title>
        <TopBar.Action className='flex items-center'>
          <Button variant='outline_secundary' className='mr-4'>Cancelar</Button>
          <Button variant='secondary' className='py-5'>Salvar</Button>
        </TopBar.Action>
      </TopBar.Root>

      <form onSubmit={workoutInfoMethods.handleSubmit(handleOnSubmitWorkoutInfo)} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-6">
        <FormProvider {...workoutInfoMethods}>
          <TextInput
            label='Descrição do treino'
            placeholder='Exemplo: Semana 1'
            classNameContainer='col-span-2'
            name='descriptionWorkout'
          />

          <CalendarInput
            name='startDate'
            label='Início'
          />

          <CalendarInput
            name='endDate'
            label='Término'
          />

          <CalendarInput
            name='revaluation'
            label='Reavaliação'
          />

          <ComboBoxInput
            name='daysOfWorkout'
            label='Dias de treino'
            data={DAYS_WORKOUT}
            subData={DAYS_WORKOUT_RANGE}
            useSubData
            placeholder='Selecione uma opção'
          />

          <ComboBoxInput
            name='student'
            label='Aluno'
            data={studentsData}
            classNameContainer='col-span-2'
            placeholder='Selecione uma opção'
          />

          <TextInput
            label='Objetivo'
            classNameContainer='col-span-2'
            placeholder='Exemplo: Hipertrofia'
            name='objective' />

          <TextInput
            label='Observação'
            classNameContainer='col-span-2'
            placeholder='Exemplo: Mobilidade todos os dias antes do treino'
            name='obs' />
        </FormProvider>
      </form>

      <Tabs defaultValue={workoutTabs[0]} value={selectedWorkoutTab} className="mt-8" onValueChange={setSelectedWorkoutTab}>
        <TabsList className="">
          {
            workoutTabs.map((tab) => (
              <TabsTrigger key={tab} className='mr-2 text-lg hover:border-b-2 hover:border-b-secondary' value={tab}>Treino {tab}</TabsTrigger>
            ))
          }
          <Button
            variant='clear'
            onClick={handleAddNewTabOnOrder}
            className='mr-2 flex items-center text-lg text-secondary hover:border hover:border-secondary'
          >
            <PlusCircle className='mr-2' />
            Treino
          </Button>
        </TabsList>
        <div className='mb-5 mt-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <Button variant='secondary' className='ml-2 mr-8' onClick={handleOpenModal}>Adicionar Exercício</Button>
            <div className='flex items-center'>
              <Button variant='outline_secundary' className='mr-3'>Adicionar Exercício da Biblioteca</Button>

              <Tooltip>
                Na Biblioteca Pump você encontra vários exercícios pré-definidos que te ajudarão a agilizar o processo de adicionar exercícios.
                O melhor de tudo é que, depois de adicionados, você pode editá-los ajustando o exercício como preferir.
              </Tooltip>
            </div>
          </div>

          <Button variant='destructive'>Excluir treino</Button>
        </div>
        {
          workoutTabs.map((tab) => (
            <TabsContent value={tab} key={tab} className='h-full min-h-[400px] rounded-md bg-zinc-800 p-5'>
              {
                !exercisesDisplay?.[tab] && <NoResults >Nenhum exercício foi registrado por enquanto.</NoResults>
              }
              {exercisesDisplay?.[tab] && exercisesDisplay?.[tab]?.map((exercise, index) => (
                <ExerciseDisplay
                  key={exercise.name + '_' + index}
                  name={exercise.name}
                  sets={exercise.sets}
                  repetitions={exercise.repetitions}
                  observation={exercise.observation}
                  rest={exercise.rest}
                />
              ))}
            </TabsContent>
          ))
        }
      </Tabs>
      <Modal
        isStatic
        isModalOpen={isOpenModal}
        setIsModalOpen={() => { }}
        title='Novo Exercício'
        subtitle='Informe os dados abaixo:'
      >
        <form onSubmit={newExerciseMethods.handleSubmit(handleOnSubmitNewExercise)} className='grid gap-3'>
          <FormProvider {...newExerciseMethods}>
            <TextInput
              label='Exercício'
              classNameLabel='w-full'
              className='w-full'
              name='name'
            />
            <TextInput
              label='Séries'
              type='number'
              classNameLabel='w-full'
              className='w-full'
              name='sets'
            />
            <TextInput
              label='Repetições'
              classNameLabel='w-full'
              className='w-full'
              name='repetitions'
            />
            <TextInput
              label='Descanso'
              placeholder='Ex: "45s" ou "2m"'
              classNameLabel='w-full'
              className='w-full'
              name='rest'
            />
            <TextInput
              label='Link do Vídeo'
              placeholder='https://www.youtube...'
              classNameLabel='w-full'
              className='w-full'
              name='videoLink'
            />
            <TextAreaInput
              label='Observação'
              placeholder='Digite aqui sua observação...'
              classNameLabel='w-full'
              className='w-full'
              name='observation'
            />

            {!dontShowTips && <Alert className="bg-slate-700">
              <Lightbulb className='size-5 text-yellow-500' />
              <AlertDescription>
                É possível personalizar a quantidade de repetições para o seu treino, separando-as por vírgulas.
                Por exemplo, em um Drop set, você pode especificar 12, 10, 8 repetições para diferentes conjuntos.

                <div className='mt-4 flex items-center'>
                  <Checkbox id="tips" onCheckedChange={() => useLocalStorage.setDataByKey({ key: useLocalStorage.keys.DONT_SHOW_TIPS, value: true })} />
                  <label
                    htmlFor="tips"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Não mostrar novamente
                  </label>
                </div>
              </AlertDescription>
            </Alert>}

            <div className='flex justify-end'>
              <Button variant='outline_secundary' type='button' className='mr-4' onClick={handleCloseModal}>Cancelar</Button>
              <Button variant='secondary' type='submit' className='py-5'>Salvar</Button>
            </div>
          </FormProvider>
        </form>
      </Modal>
    </Layout>
  )
}
