'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDebounce } from "@uidotdev/usehooks";
import { ChevronsUp, Lightbulb, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useDeferredValue } from 'react';
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
import { Separator } from '@/components/ui/Separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/TabsAlternative';
import { TopBar } from "@/components/ui/TopBar";
import { ExerciseDisplay } from '@/components/workouts/ExerciseDisplay';
import { NoResults } from '@/components/workouts/NoResults';
import { PreviewExercise } from '@/components/workouts/PreviewExercise';
import { SummaryWorkouts } from '@/components/workouts/SummaryWorkouts';
import { DAYS_WORKOUT, DAYS_WORKOUT_RANGE, BODY_PART, EQUIPAMENT, TARGET } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { useSchema } from '@/hooks/useSchema';
import { useListRiftLibExercises } from '@/services/hooks/useListRiftLibExercises';
import { useListStudents } from '@/services/hooks/useListStudents';
import { useRegisterWorkout } from '@/services/hooks/useRegisterWorkout';

type NewWorkoutProps = Required<z.infer<typeof useSchema.newWorkout>>;
type NewExerciseProps = Required<z.infer<typeof useSchema.newExercise>>;
type SmartExerciseSearchProps = Required<z.infer<typeof useSchema.smartExerciseSearch>>;

export interface ExerciseInterface {
  name: string;
  sets: number;
  repetitions: Array<number>;
  videoLink: string;
  observation: string;
  rest: string;
}

const initalTabs = ['A', 'B', 'C'];

//https://github.com/thiagoadsix/pump/commit/da5d61f8a1e7f10806abd62ed05e66e3f8ae0720

export default function Register() {
  const dontShowTips = useLocalStorage.getDataByKey({ key: useLocalStorage.keys.DONT_SHOW_TIPS }) || false;

  const workoutInfoMethods = useForm<NewWorkoutProps>({
    resolver: zodResolver(useSchema.newWorkout),
  });
  const newExerciseMethods = useForm<NewExerciseProps>({
    resolver: zodResolver(useSchema.newExercise),
  });
  const smartExerciseSearch = useForm<SmartExerciseSearchProps>({
    resolver: zodResolver(useSchema.smartExerciseSearch),
  });

  const [workoutTabs, setWorkoutTabs] = useState(initalTabs);
  const [showListWorkoutAdded, setShowListWorkoutAdded] = useState(false);
  const [modalControllerNewExercise, setModalControllerNewExercise] = useState({
    isOpen: false,
    isEditing: false,
    keyEditing: -1
  });
  const [modalControllerRiftExercise, setModalControllerRiftExercise] = useState({
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
  const objNewExercise = smartExerciseSearch.watch() || {}
  const term = smartExerciseSearch.watch('term');
  const termDebounce = useDebounce(term, 3000);

  const { data: listRiftExercises } = useListRiftLibExercises({
    payload: {
      term: termDebounce,
      bodyPart: smartExerciseSearch.watch('bodyPart') || undefined,
      equipment: smartExerciseSearch.watch('equipment') || undefined,
      target: smartExerciseSearch.watch('target') || undefined,
    }, options: { refetchOnWindowFocus: false, enabled: Object.values(objNewExercise).length > 0 }
  })


  const { data: listStudents } = useListStudents({ refetchOnWindowFocus: false });
  const studentsData = listStudents?.map(student => {
    return { label: student.name + ' ' + student.surname, value: student.id }
  }) || [];



  const handleOpenModal = () => {
    newExerciseMethods.reset({});
    setModalControllerNewExercise({
      isOpen: true,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleCloseModal = () => {
    newExerciseMethods.clearErrors();
    newExerciseMethods.reset({});
    setModalControllerNewExercise({
      isOpen: false,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleOpenModalRitfExercise = () => {
    smartExerciseSearch.reset({});
    setModalControllerRiftExercise({
      isOpen: true,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleCloseModalRitfExercise = () => {
    smartExerciseSearch.clearErrors();
    smartExerciseSearch.reset({});
    setModalControllerRiftExercise({
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
        i === modalControllerNewExercise.keyEditing ? {
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

    if (modalControllerNewExercise.isEditing) {
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
              <Button variant='outline_secundary' className='mr-3' onClick={handleOpenModalRitfExercise}>Adicionar Exercício da Biblioteca</Button>

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
                    setModalControllerNewExercise({
                      isOpen: true,
                      isEditing: true,
                      keyEditing: index
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
        isModalOpen={modalControllerRiftExercise.isOpen}
        setIsModalOpen={() => { }}
        title='Selecione um ou mais exercícios'
        subtitle='Você poderá buscar por filtros ou nomes. Após selecionar, você ainda poderá editá-los.'
        classNamePanel='max-w-[60vw]'
      >
        <form className='grid gap-3'>
          <FormProvider {...smartExerciseSearch}>
            <TextInput
              label='Exercício'
              classNameLabel='w-full'
              className='w-full'
              name='term'
              placeholder='Digite o nome do exercício'
            />
            <div className='flex items-center justify-between'>
              <div className='mt-0.5 w-full border-t border-zinc-700' />
              <span className='px-2 text-zinc-400'>
                ou
              </span>
              <div className='mt-0.5 w-full border-t border-zinc-700' />
            </div>
            <div>
              <div className='grid grid-cols-1 gap-3 pb-3 lg:grid-cols-3'>
                <ComboBoxInput
                  name='bodyPart'
                  label='Partes do corpo'
                  data={BODY_PART}
                  placeholder='Selecione uma opção'
                />
                <ComboBoxInput
                  name='equipment'
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

            <div className='scrollbar scrollbar-track-zinc-800 scrollbar-thumb-zinc-700 mt-1.5 grid max-h-[60vh] min-h-[60vh] grid-cols-1 items-start gap-5 overflow-y-auto pb-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {
                (listRiftExercises || []).map((exercise, key) => (
                  <PreviewExercise selected={key === 1} imageUrl={exercise.gif} name={exercise.name} key={exercise.name} />
                ))
              }
            </div>
            <div className='fixed bottom-0 z-fixed -ml-4 flex w-full justify-center  p-2 shadow-2xl'>
              <SummaryWorkouts workouts={1} isOpen={showListWorkoutAdded} onClick={() => setShowListWorkoutAdded(!showListWorkoutAdded)}>
                <div className='h-15'>teste</div>
              </SummaryWorkouts>
            </div>
          </FormProvider>
        </form>
      </Modal>
      {/* {modalController.isOpen && <div className='fixed bottom-0 z-fixed  mb-5 flex w-[87.5vw] justify-center'>
        <div className='w-full max-w-[58vw] bg-zinc-700'>
          teste
        </div>
      </div>} */}
      <Modal
        isStatic
        isModalOpen={modalControllerNewExercise.isOpen}
        setIsModalOpen={() => { }}
        title='Novo Exercício'
        subtitle='Informe os dados abaixo:'
        classNamePanel='max-w-md'
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
              <Button variant='secondary' type='submit' className='py-5'>{modalControllerNewExercise.isEditing ? 'Salvar Alterações' : 'Salvar'}</Button>
            </div>
          </FormProvider>
        </form>
      </Modal>
    </Layout >
  )
}
