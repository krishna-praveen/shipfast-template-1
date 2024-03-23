'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { Lightbulb, PlusCircle, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import Layout from "@/components/layout/Layout";
import { Tooltip } from '@/components/Tooltip';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ComboBoxInput } from '@/components/ui/Form/ComboBoxInput';
import { TextAreaInput } from '@/components/ui/Form/TextAreaInput';
import { TextInput } from '@/components/ui/Form/TextInput';
import { ModalDestructive } from '@/components/ui/ModalDestructive';
import { ModalScalable } from '@/components/ui/ModalScalable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/TabsAlternative';
import { TopBar } from "@/components/ui/TopBar";
import { ExerciseDisplay } from '@/components/workouts/ExerciseDisplay';
import { NoResults } from '@/components/workouts/NoResults';
import { PreviewExercise } from '@/components/workouts/PreviewExercise';
import { SummaryWorkouts } from '@/components/workouts/SummaryWorkouts';
import { BODY_PART, EQUIPAMENT, TARGET } from '@/constants';
import { useDate } from '@/hooks/useDate/useDate';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { useSchema } from '@/hooks/useSchema';

import { useListAssessmentsByUserId } from '@/services/hooks/useListAssessmentsByUserId';
import { useListRyftLibExercises } from '@/services/hooks/useListRyftLibExercises';
import { useListStudents } from '@/services/hooks/useListStudents';
import { useRegisterWorkout } from '@/services/hooks/useRegisterWorkout';

import { RyftExercise } from '@/types/models/listRyftLibExercises.model';

type NewWorkoutProps = Required<z.infer<typeof useSchema.newWorkout>>;
type NewExerciseProps = Required<z.infer<typeof useSchema.newExercise>>;
type NewExerciseSmartProps = Required<z.infer<typeof useSchema.newExerciseSmart>>;
type SmartExerciseSearchProps = Required<z.infer<typeof useSchema.smartExerciseSearch>>;

export interface ExerciseInterface {
  id: number;
  name: string;
  sets: string;
  repetitions: Array<number>;
  gif: string;
  observation: string;
  rest: string;
}

const initalTabs = ['A', 'B', 'C'];

export default function Register() {
  const router = useRouter()
  const dontShowTips = useLocalStorage.getDataByKey({ key: useLocalStorage.keys.DONT_SHOW_TIPS }) || false;

  const workoutInfoMethods = useForm<NewWorkoutProps>({
    resolver: zodResolver(useSchema.newWorkout),
  });
  const newExerciseMethods = useForm<NewExerciseProps>({
    resolver: zodResolver(useSchema.newExercise),
  });
  const newExerciseSmart = useForm<NewExerciseSmartProps>({
    resolver: zodResolver(useSchema.newExerciseSmart),
  });
  const smartExerciseSearch = useForm<SmartExerciseSearchProps>({
    resolver: zodResolver(useSchema.smartExerciseSearch),
  });

  const [workoutTabs, setWorkoutTabs] = useState(initalTabs);
  const [showListWorkoutAdded, setShowListWorkoutAdded] = useState(false);
  const [openModalMoreDetails, setOpenModalMoreDetails] = useState(false);
  const [selectedRiftExerciseToAddMoreDetails, setSelectedRiftExerciseToAddMoreDetails] = useState<RyftExercise | undefined>();

  const [modalControllerEditExercise, setModalControllerEditExercise] = useState({
    isOpen: false,
    isEditing: false,
    keyEditing: -1
  });
  const [modalControllerRyftExercise, setModalControllerRyftExercise] = useState({
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
  const objNewExerciseFilled = Object.values(objNewExercise).filter(exercise => exercise).length > 0

  const { data: listRyftExercises, isIdle: isIdleListRyft, isLoading: isLoadingListRyft, isFetching: isFetchingListRyft } = useListRyftLibExercises({
    payload: {
      term: smartExerciseSearch.watch('term') || undefined,
      bodyPart: smartExerciseSearch.watch('bodyPart') || undefined,
      equipment: smartExerciseSearch.watch('equipment') || undefined,
      target: smartExerciseSearch.watch('target') || undefined,
    },
    options: {
      refetchOnWindowFocus: false,
      enabled: objNewExerciseFilled
    }
  })

  const { data: listAssessments } = useListAssessmentsByUserId({
    payload: {
      studentId: workoutInfoMethods.watch('student')
    },
    options: {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.length > 0) {
          workoutInfoMethods.setValue('assessmentId', data[0].id, { shouldValidate: true })
        } else {
          workoutInfoMethods.resetField('assessmentId')
        }
      },
      enabled: !!workoutInfoMethods.watch('student')
    }
  });
  const assessmentsData = listAssessments?.map(student => {
    return { label: useDate.formatStartEndDateToMMYYYY({ startDate: student.startDate, endDate: student.endDate }), value: student.id }
  }) || [];


  const { data: listStudents } = useListStudents({ refetchOnWindowFocus: false });
  const studentsData = listStudents?.map(student => {
    return { label: student.name + ' ' + student.surname, value: student.id }
  }) || [];

  const handleCloseModal = () => {
    newExerciseMethods.clearErrors();
    newExerciseMethods.reset({});
    setModalControllerEditExercise({
      isOpen: false,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleOpenModalRitfExercise = () => {
    setModalControllerRyftExercise({
      isOpen: true,
      isEditing: false,
      keyEditing: -1
    });
  }
  const handleCloseModalRitfExercise = () => {
    setModalControllerRyftExercise({
      isOpen: false,
      isEditing: false,
      keyEditing: -1
    });
    setShowListWorkoutAdded(false);
  }

  const handleOpenModalToMoreDetailRitfExercise = (exercise: RyftExercise) => {
    if (exerciseIsSelected(exercise.id)) return handleRemoveSmartExercise(selectedWorkoutTab, exercise.id);
    setSelectedRiftExerciseToAddMoreDetails(exercise);
    setOpenModalMoreDetails(true);
    newExerciseSmart.clearErrors();
    newExerciseSmart.reset({});
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

  const handleSaveEditedExercise = ({ name, observation, repetitions, rest, sets, gif, id }: NewExerciseProps) => {
    handleCloseModal();

    setExercisesDisplay(prevExercises => ({
      ...prevExercises,
      [selectedWorkoutTab]: prevExercises[selectedWorkoutTab].map((ex, i) =>
        i === modalControllerEditExercise.keyEditing ? {
          name: name,
          sets: sets.replace(/\s/g, ''),
          repetitions: repetitions.split(",").map(Number),
          observation: observation,
          rest: rest,
          gif: gif,
          id: id
        } : ex
      ),
    }));
  };

  const handleNewExercise = ({ name, observation, repetitions, rest, sets, gif, id }: NewExerciseProps) => {
    setExercisesDisplay(prevState => ({
      ...prevState,
      [selectedWorkoutTab]: [...(prevState?.[selectedWorkoutTab] || []), {
        name: name,
        sets: sets.replace(/\s/g, ''),
        repetitions: repetitions ? repetitions.split(",").map(Number) : [],
        rest: rest,
        gif: gif,
        id: id,
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

  const handleRemoveSmartExercise = (tab: string, id: number) => {
    setExercisesDisplay(prevExercises => ({
      ...prevExercises,
      [tab]: prevExercises[tab].filter((item) => item.id !== id),
    }));
  }


  const handleOnSubmitWorkoutInfo: SubmitHandler<NewWorkoutProps> = async (data) => {
    const workoutTabsFilter = workoutTabs.filter(exists => exists)
    const exerciseKeys = Object.keys(exercisesDisplay);
    const validTabs = exerciseKeys.filter(key => workoutTabsFilter.includes(key));
    const payload = new Array()
    const exercisePayload = validTabs.map(tab => {
      const objToSend = {
        type: tab,
        data: exercisesDisplay[tab].map(exercise => ({
          id: exercise.id,
          sets: exercise.sets,
          repetitions: exercise.repetitions,
          observation: exercise?.observation || '',
        }))
      }
      payload.push({ ...objToSend })
      return { ...objToSend }
    })
    console.log('payload', payload)
    try {
      await UseRegisterWorkout.mutateAsync({
        assessmentId: data.student,
        description: data.descriptionWorkout,
        goal: data.goal,
        observation: data.obs,
        exercises: payload,
      })
    } catch (error) {
      console.log(error)
    }
  }


  const handleOnSubmitNewExercise: SubmitHandler<NewExerciseProps> = ({ name, observation, repetitions, rest, sets, gif, id }) => {
    handleCloseModal();
    handleSaveEditedExercise({ name, observation, repetitions, rest, sets, gif, id });
  }

  const handleOnSubmitAddNewExercise: SubmitHandler<NewExerciseSmartProps> = ({ observation, repetitions, rest, sets }) => {
    const name = selectedRiftExerciseToAddMoreDetails.name;
    const gif = selectedRiftExerciseToAddMoreDetails.gif;
    const id = selectedRiftExerciseToAddMoreDetails.id;

    setOpenModalMoreDetails(false);
    handleNewExercise({ name, observation, repetitions, rest, sets, gif, id });
  }

  const exerciseIsSelected = (id: number) => {
    return !!exercisesDisplay?.[selectedWorkoutTab]?.find(item => item.id === id)
  }
  const getLength = () => {
    return exercisesDisplay?.[selectedWorkoutTab]?.length
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

      <form onSubmit={workoutInfoMethods.handleSubmit(handleOnSubmitWorkoutInfo)}>
        <FormProvider {...workoutInfoMethods}>
          <TopBar.Root>
            <TopBar.Title>
              Novo Treino
            </TopBar.Title>
            <TopBar.Action className='flex items-center'>
              <Button variant='outline_secundary' className='mr-4' onClick={() => router.back()}>Cancelar</Button>
              <Button variant='secondary' type='submit' className='py-5' disabled={(Object.values(exercisesDisplay || {})?.length || 0) === 0}>Salvar</Button>
            </TopBar.Action>
          </TopBar.Root>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-6">
            <ComboBoxInput
              name='student'
              label='Aluno'
              data={studentsData}
              classNameContainer='col-span-2'
              placeholder='Selecione uma opção'
            />

            <ComboBoxInput
              name='assessmentId'
              label='Avaliação'
              data={assessmentsData}
              classNameContainer='col-span-2'
              noResultText='Sem avaliação para o aluno selecionado'
              placeholder='Selecione uma opção'
              disabled={assessmentsData.length === 0}
            />

            <TextInput
              label='Descrição do treino'
              placeholder='Exemplo: Semana 1'
              classNameContainer='col-span-2'
              name='descriptionWorkout'
            />

            <TextInput
              label='Objetivo'
              classNameContainer='col-span-2'
              placeholder='Exemplo: Hipertrofia'
              name='goal' />

            <TextInput
              label='Observação'
              classNameContainer='col-span-2 lg:col-span-4'
              placeholder='Exemplo: Mobilidade todos os dias antes do treino'
              name='obs' />
          </div>
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
            <div className='flex items-center'>
              <Button variant='secondary' className='mr-3' onClick={handleOpenModalRitfExercise}>Adicionar Exercício da Biblioteca</Button>

              <Tooltip>
                Na Biblioteca Ryft você encontra vários exercícios pré-definidos que te ajudarão a agilizar o processo de adicionar exercícios.
                O melhor de tudo é que, depois de adicionados, você pode editá-los ajustando o exercício como preferir.
              </Tooltip>
            </div>
          </div>

          {workoutTabs.length > 1 &&
            <div className='col-span-2 mr-2 mt-4 flex items-center justify-end lg:col-span-1 lg:mr-0 lg:mt-0'>
              <Button
                variant='destructive'
                onClick={() => onOpenAlert(
                  `Excluir Treino ${selectedWorkoutTab}`,
                  `Excluindo o Treino ${selectedWorkoutTab} você perde os exercícios vinculados a este treino. Tem certeza de que deseja excluir?`,
                  () => onConfirmAlert(selectedWorkoutTab),
                  () => onCloseAlert())
                }>
                Excluir treino
              </Button>
            </div>
          }
        </div>
        {
          workoutTabs.map((tab) => (
            <TabsContent value={tab} key={tab} className='h-full min-h-[360px] rounded-md bg-zinc-800 p-5'>
              {
                (exercisesDisplay?.[tab]?.length || 0) === 0 && <NoResults >Nenhum exercício foi registrado por enquanto.</NoResults>
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
                    setModalControllerEditExercise({
                      isOpen: true,
                      isEditing: true,
                      keyEditing: index
                    });
                    newExerciseMethods.reset({
                      gif: exercise.gif,
                      name: exercise.name,
                      observation: exercise.observation,
                      repetitions: exercise.repetitions.join(', '),
                      rest: exercise.rest,
                      sets: exercise.sets,
                      id: exercise.id
                    })
                  }}
                />
              ))}
            </TabsContent>
          ))
        }
      </Tabs>


      <ModalScalable
        isStatic
        showCloseButton
        isModalOpen={modalControllerRyftExercise.isOpen}
        onClose={() => { handleCloseModalRitfExercise() }}
        title='Selecione um ou mais exercícios'
        subtitle='Você poderá buscar por filtros ou nomes. Após selecionar, você ainda poderá editá-los.'
        classNamePanel='max-w-[65vw]'
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
              <div className='flex min-h-1.5 justify-end'>
                {isFetchingListRyft &&
                  <div className='animate-spin'>
                    <Loader2Icon className='size-3' />
                  </div>
                }
              </div>
            </div>


            {
              isIdleListRyft &&
              <div className={twMerge('flex max-h-[60vh] min-h-[60vh] flex-col items-center justify-center', getLength() > 0 && '-mt-10')}>
                <b>Pesquise por um nome do exercício</b>
                <span className='font-thin'>ou se preferir, utilize as categorias para navegar pelo <b className='text-lg font-extrabold text-secondary'>Ryft</b></span>
              </div>
            }

            {
              isLoadingListRyft &&
              <div className={twMerge('flex max-h-[60vh] min-h-[60vh] flex-col items-center justify-center', getLength() > 0 && '-mt-10')}>
                <div className='animate-spin'>
                  <Loader2Icon />
                </div>
              </div>
            }

            {
              !isIdleListRyft && !isLoadingListRyft && (listRyftExercises || []).length === 0 &&
              <div className={twMerge('flex max-h-[60vh] min-h-[60vh] flex-col items-center justify-center', getLength() > 0 && '-mt-10')}>
                <b>Sem resultados para a busca informada</b>
                <span className='font-thin'>tente ajustar a busca ou selecione outras categorias</span>
              </div>
            }

            {(listRyftExercises || []).length > 0 &&
              <div className='scrollbar scrollbar-track-zinc-800 scrollbar-thumb-zinc-700 mt-1.5 grid max-h-[60vh] min-h-[60vh] grid-cols-1 items-start gap-5 overflow-y-auto pb-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                  (listRyftExercises || []).map((exercise, key) => (
                    <PreviewExercise
                      selected={exerciseIsSelected(exercise.id)}
                      imageUrl={exercise.gif}
                      name={exercise.name}
                      key={exercise.name + '_' + key}
                      onClick={() => handleOpenModalToMoreDetailRitfExercise(exercise)}
                    />
                  ))
                }
              </div>
            }

            {getLength() > 0 && <div className='fixed bottom-0 z-fixed -ml-4 flex w-full justify-center  p-2 shadow-2xl'>
              <SummaryWorkouts
                className='shadow-2xl'
                workouts={getLength()}
                isOpen={showListWorkoutAdded}
                onClick={() => setShowListWorkoutAdded(!showListWorkoutAdded)}
              >
                <div className='mt-3 max-h-[40vh] overflow-y-auto'>
                  {
                    exercisesDisplay?.[selectedWorkoutTab] && exercisesDisplay?.[selectedWorkoutTab]?.map((exercise, index) => (
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
                          () => handleRemoveExercise(selectedWorkoutTab, index),
                          () => onCloseAlert())
                        }
                        onEditExercise={() => {
                          setModalControllerEditExercise({
                            isOpen: true,
                            isEditing: true,
                            keyEditing: index
                          });
                          newExerciseMethods.reset({
                            gif: exercise.gif,
                            name: exercise.name,
                            observation: exercise.observation,
                            repetitions: exercise.repetitions.join(', '),
                            rest: exercise.rest,
                            sets: exercise.sets,
                            id: exercise.id
                          })
                        }}
                      />))
                  }
                </div>

              </SummaryWorkouts>
            </div>}
          </FormProvider>
        </form>
      </ModalScalable>

      <ModalScalable
        isModalOpen={modalControllerEditExercise.isOpen}
        onClose={() => { }}
        title={'Editando: ' + newExerciseMethods.watch('name') || ''}
        subtitle='Personalização salva do exercício:'
        classNamePanel='max-w-[40vw]'
        classNameDialog='z-60'
      >
        <FormProvider {...newExerciseMethods}>
          <form onSubmit={newExerciseMethods.handleSubmit(handleOnSubmitNewExercise)} className='grid grid-cols-2  gap-3'>
            <div className='col-span-2 lg:col-span-1'>
              {newExerciseMethods.watch('gif') && <Image
                src={newExerciseMethods.watch('gif')}
                alt='Ryft'
                width={350}
                height={300}
                className='rounded-md'
              />}
            </div>
            <div className='grid'>
              <TextInput
                label='Séries'
                type='number'
                classNameLabel='w-full'
                className='w-full'
                name='sets'
                autoFocus
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
              <TextAreaInput
                label='Observação'
                placeholder='Digite aqui sua observação...'
                classNameLabel='w-full'
                className='w-full'
                name='observation'
              />
            </div>

            {!dontShowTips && <Alert className="col-span-2 bg-slate-700">
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

            <div className='col-span-2 mt-4 flex justify-end'>
              <Button variant='outline_secundary' type='button' className='mr-4' onClick={handleCloseModal}>Cancelar</Button>
              <Button variant='secondary' type='submit' className='py-5'>Salvar Alterações</Button>
            </div>
          </form>
        </FormProvider>
      </ModalScalable>

      <ModalScalable
        isStatic
        isModalOpen={openModalMoreDetails}
        onClose={() => { }}
        title='Adicionar informações personalizadas'
        subtitle='Você pode ajustar repetições, tempo de descanso entre a execução dos exercícios.'
        classNamePanel='max-w-[50vw] xl:max-w-[40vw]'
        classNameDialog='z-60'
      >
        <FormProvider {...newExerciseSmart}>
          <form className='grid grid-cols-2 gap-4' onSubmit={newExerciseSmart.handleSubmit(handleOnSubmitAddNewExercise)} >
            <div className='col-span-2 lg:col-span-1'>
              <Image
                src={selectedRiftExerciseToAddMoreDetails?.gif || ''}
                alt='Ryft'
                width={400}
                height={450}
                className='rounded-md'
              />
              <span>{selectedRiftExerciseToAddMoreDetails?.name || 'Ryft Exercise'}</span>
            </div>
            <div className='col-span-2 grid gap-1 lg:col-span-1'>
              <TextInput
                label='Repetições'
                classNameLabel='w-full'
                className='w-full'
                name='repetitions'
              />
              <TextInput
                label='Series'
                type='number'
                classNameLabel='w-full'
                className='w-full'
                name='sets'
              />
              <TextInput
                label='Descanso'
                placeholder='Ex: "45s" ou "2m"'
                classNameLabel='w-full'
                className='w-full'
                name='rest'
              />
              <TextAreaInput
                label='Observação'
                placeholder='Digite aqui sua observação...'
                classNameLabel='w-full'
                className='w-full'
                name='observation'
              />

            </div>

            {!dontShowTips && <Alert className="col-span-2 bg-slate-700">
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

            <div className='col-span-2 flex items-center justify-end'>
              <Button type='button' className='mr-2' variant='outline_secundary' onClick={() => setOpenModalMoreDetails(false)}>Cancelar</Button>
              <Button type='submit' variant='secondary'>Adicionar</Button>
            </div>
          </form>
        </FormProvider>
      </ModalScalable>
    </Layout >
  )
}
