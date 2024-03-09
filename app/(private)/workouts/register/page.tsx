'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { Lightbulb, PlusCircle } from 'lucide-react';
import Image from 'next/image';
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
import { ModalDestructive } from '@/components/ui/ModalDestructive';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/TabsAlternative';
import { TopBar } from "@/components/ui/TopBar";
import { ExerciseDisplay } from '@/components/workouts/ExerciseDisplay';
import { NoResults } from '@/components/workouts/NoResults';
import { DAYS_WORKOUT, DAYS_WORKOUT_RANGE, BODY_PART, EQUIPAMENT, TARGET } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { useSchema } from '@/hooks/useSchema';
import { useListRiftLibExercises } from '@/services/hooks/useListRiftLibExercises';
import { useListStudents } from '@/services/hooks/useListStudents';
import { useRegisterWorkout } from '@/services/hooks/useRegisterWorkout';

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [modalController, setModalController] = useState({
    isOpen: false,
    isEditing: false,
    keyEditing: -1
  });
  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    onCancel: () => { }
  });
  const [selectedWorkoutTab, setSelectedWorkoutTab] = useState(initalTabs[0]);
  const [exercisesDisplay, setExercisesDisplay] = useState<{ [key: string]: ExerciseInterface[] }>();
  const UseRegisterWorkout = useRegisterWorkout({})
  const { data: listRiftExercises } = useListRiftLibExercises({
    payload: {
      term: 'Supino',
    }, options: { refetchOnWindowFocus: false }
  })

  console.log(listRiftExercises)

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

  const handleOpenModal = () => {
    newExerciseMethods.reset({});
    setModalController({
      isOpen: true,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleCloseModal = () => {
    newExerciseMethods.clearErrors();
    newExerciseMethods.reset({});
    setModalController({
      isOpen: false,
      isEditing: false,
      keyEditing: -1
    });
  }

  const onOpenAlert = (title: string, message: string, onConfirm: () => void, onCancel: () => void) => {
    setOpenAlert({
      isOpen: true,
      title,
      message,
      onConfirm,
      onCancel,
    })
  }

  const onConfirmAlert = (selectedWorkoutTab: string) => {
    handleRemoveTab(selectedWorkoutTab);
    onCloseAlert();
  }

  const onCloseAlert = () => {
    setOpenAlert(prevState => ({
      isOpen: false,
      title: prevState.title,
      message: prevState.message,
      onConfirm: () => { },
      onCancel: () => { }
    }))
  }


  const handleAddNewTabOnOrder = () => {
    setWorkoutTabs(prevTabs => {
      const asciiCodeLastPosition = prevTabs.at(-1).charCodeAt(0);
      const nextCodeAlpha = String.fromCharCode(asciiCodeLastPosition + 1);

      setSelectedWorkoutTab(nextCodeAlpha);
      return [...prevTabs, nextCodeAlpha];
    });
  }

  const handleRemoveTab = (tab: string) => {
    if (workoutTabs.length === 1) return
    const filteredTabs = workoutTabs.filter(t => t !== tab);
    const lastTab = filteredTabs.at(-1);

    setWorkoutTabs(filteredTabs);
    setSelectedWorkoutTab(lastTab);
  }

  const handleSaveEditedExercise = ({ name, observation, repetitions, rest, sets, videoLink }: NewExerciseProps) => {
    handleCloseModal();

    setExercisesDisplay(prevExercises => ({
      ...prevExercises,
      [selectedWorkoutTab]: prevExercises[selectedWorkoutTab].map((ex, i) =>
        i === modalController.keyEditing ? {
          name: name,
          sets: Number(sets.replace(/\s/g, '')),
          repetitions: repetitions.split(",").map(Number),
          observation: observation,
          rest: rest,
          videoLink: videoLink
        } : ex
      ),
    }));
  };

  const handleNewExercise = ({ name, observation, repetitions, rest, sets, videoLink }: NewExerciseProps) => {
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
  };

  const handleRemoveExercise = (tab: string, index: number) => {
    setExercisesDisplay(prevExercises => ({
      ...prevExercises,
      [tab]: prevExercises[tab].filter((_, i) => i !== index),
    }));
    onCloseAlert();
  }


  const handleOnSubmitWorkoutInfo: SubmitHandler<NewWorkoutProps> = async (data) => {
    const workoutTabsFilter = workoutTabs.filter(exists => exists)
    const exerciseKeys = Object.keys(exercisesDisplay);
    const validTabs = exerciseKeys.filter(key => workoutTabsFilter.includes(key));
    const payload = new Array();

    const test = validTabs.forEach(tab => {
      const results = {
        [tab]: exercisesDisplay[tab].map(exercise => ({
          ...exercise,
          type: workoutTabsFilter
        }))
      }
      payload.push({ ...results })
    })

    console.log('test', payload)

    try {
      // await UseRegisterWorkout.mutateAsync({
      //   assessmentId: data.student,
      //   description: data.descriptionWorkout,
      //   goal: data.goal,
      //   type: workoutTabsFilter,
      //   phase: 0,
      //   exercises: ,
      // })
    } catch (error) {
      console.log(error)
    }
  }


  const handleOnSubmitNewExercise: SubmitHandler<NewExerciseProps> = ({ name, observation, repetitions, rest, sets, videoLink }) => {
    handleCloseModal();

    if (modalController.isEditing) {
      handleSaveEditedExercise({ name, observation, repetitions, rest, sets, videoLink })
    } else {
      handleNewExercise({ name, observation, repetitions, rest, sets, videoLink })
    }
  }

  return (
    <Layout>
      <ModalDestructive
        title={openAlert.title}
        message={openAlert.message}
        isOpen={openAlert.isOpen}
        onAccept={openAlert.onConfirm}
        onCancel={openAlert.onCancel}
      />

      <TopBar.Root>
        <TopBar.Title>
          Novo Treino
        </TopBar.Title>
        <TopBar.Action className='flex items-center'>
          <Button variant='outline_secundary' className='mr-4'>Cancelar</Button>
          <Button variant='secondary' onClick={workoutInfoMethods.handleSubmit(handleOnSubmitWorkoutInfo)} className='py-5'>Salvar</Button>
        </TopBar.Action>
      </TopBar.Root>

      <form className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-6">
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
            name='goal' />

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
        <div className='mb-5 mt-6 grid grid-cols-2 items-center justify-between md:flex-row'>
          <div className='col-span-2 flex items-center lg:col-span-1'>
            <Button variant='secondary' className='ml-2 mr-8' onClick={handleOpenModal}>Adicionar Exercício</Button>
            <div className='flex items-center'>
              <Button variant='outline_secundary' className='mr-3'>Adicionar Exercício da Biblioteca</Button>

              <Tooltip>
                Na Biblioteca Pump você encontra vários exercícios pré-definidos que te ajudarão a agilizar o processo de adicionar exercícios.
                O melhor de tudo é que, depois de adicionados, você pode editá-los ajustando o exercício como preferir.
              </Tooltip>
            </div>
          </div>

          {workoutTabs.length > 1 && <div className='col-span-2 mr-2 mt-4 flex items-center justify-end lg:col-span-1 lg:mr-0 lg:mt-0'><Button
            variant='destructive'
            onClick={() => onOpenAlert(
              `Excluir Treino ${selectedWorkoutTab}`,
              `Excluindo o Treino ${selectedWorkoutTab} você perde os exercícios vinculados a este treino. Tem certeza de que deseja excluir?`,
              () => onConfirmAlert(selectedWorkoutTab),
              () => onCloseAlert())
            }>
            Excluir treino
          </Button></div>}
        </div>
        {
          workoutTabs.map((tab) => (
            <TabsContent value={tab} key={tab} className='h-full min-h-[360px] rounded-md bg-zinc-800 p-5'>
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
                  onDeleteExercise={() => onOpenAlert(
                    `Excluir Exercício ${exercise.name}`,
                    `Tem certeza que deseja remover o exercício ${exercise.name}?`,
                    () => handleRemoveExercise(tab, index),
                    () => onCloseAlert())
                  }
                  onEditExercise={() => {
                    setModalController({
                      isOpen: true,
                      isEditing: true,
                      keyEditing: index
                    });
                    newExerciseMethods.reset({
                      name: exercise.name,
                      sets: exercise.sets.toString(),
                      repetitions: exercise.repetitions.toString(),
                      observation: exercise.observation,
                      rest: exercise.rest,
                      videoLink: exercise.videoLink
                    });
                  }}
                />
              ))}
            </TabsContent>
          ))
        }
      </Tabs>
      <Modal
        isStatic
        isModalOpen={modalController.isOpen}
        setIsModalOpen={() => { }}
        title='Selecione um ou mais exercícios'
        subtitle='Você poderá buscar por filtros ou nomes. Após selecionar, você ainda poderá editá-los.'
        classNamePanel='max-w-[60vw]'
      >
        <form onSubmit={newExerciseMethods.handleSubmit(handleOnSubmitNewExercise)} className='grid gap-3'>
          <FormProvider {...newExerciseMethods}>
            <TextInput
              label='Exercício'
              classNameLabel='w-full'
              className='w-full'
              name='name'
              placeholder='Digite o nome do exercício'
            />
            {showAdvancedFilters &&
              <div>
                <div className='mb-3 mt-2 border-t border-zinc-800'></div>
                <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>
                  <ComboBoxInput
                    name='bodyPart'
                    label='Partes do corpo'
                    data={BODY_PART}
                    placeholder='Selecione uma opção'
                  />
                  <ComboBoxInput
                    name='equipament'
                    label='Equipamento'
                    data={EQUIPAMENT}
                    placeholder='Selecione uma opção'
                  />
                  <ComboBoxInput
                    name='target'
                    label='Alvo muscular'
                    data={TARGET}
                    placeholder='Selecione uma opção'
                  />
                </div>
              </div>
            }
            <div className='flex items-center justify-end'>
              <Button variant={showAdvancedFilters ? 'outline_secundary' : 'secondary'} type='button' onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>{showAdvancedFilters ? 'Esconder Filtros' : 'Filtros Avançados'}</Button>
            </div>
            <div className='mt-1.5 grid max-h-[60vh] grid-cols-1 items-center justify-center gap-5 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {
                (listRiftExercises || []).map((exercise) => (
                  <div key={exercise.name} className='mx-4 flex cursor-pointer flex-col items-center justify-center bg-zinc-900'>
                    <Image
                      src={exercise.gif}
                      width={225}
                      height={225}
                      className='rounded-lg'
                      alt={`pic: ${exercise.name}`}
                    />
                    <Tooltip label={exercise.name} showIcon={false} classNameLabel='overflow-hidden truncate hover:overflow-visible hover:truncate w-[8rem] md:w-[8.5rem] lg:w-[10rem] xl:w-[13rem] text-white'>
                      {exercise.name}
                    </Tooltip>
                  </div>
                ))
              }
            </div>
            <div className='fixed bottom-0 z-fixed -ml-4 mb-5 flex w-full  justify-center '>
              <div className='relative w-full bg-red-900'>

                teste
              </div>
            </div>
          </FormProvider>
        </form>
      </Modal>
      {/* {modalController.isOpen && <div className='fixed bottom-0 z-fixed  mb-5 flex w-[87.5vw] justify-center'>
        <div className='w-full max-w-[58vw] bg-zinc-700'>
          teste
        </div>
      </div>} */}
    </Layout >
  )
}
