/* eslint-disable no-unused-vars */
"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';

import Layout from "@/components/layout/Layout";

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { MaskedInput } from '@/components/ui/masked/MaskedInput';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useSchema } from '@/hooks/useSchema';
import { useRegisterStudents } from '@/services/hooks/useRegisterStudents';

export const dynamic = "force-dynamic";

type RegisterProps = Required<z.infer<typeof useSchema.registerStudents>>

enum NonGender {
  SEXO = "Sexo"
}

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RegisterProps>({
    resolver: zodResolver(useSchema.registerStudents),
  });

  const UseRegisterStudents = useRegisterStudents({
    options: {
      onSuccess: () => {
        toast.success("Cadastrado com sucesso.");
        router.replace("/students");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao cadastrar, entre em contato com o suporte.");
      }
    }
  })

  const handleRegister: SubmitHandler<RegisterProps> = async ({ birthDate, city, email, gender, name, phone, state, surname }) => {
    const birthDateFormatted = birthDate.split('/').reverse().join('-');

    try {
      await UseRegisterStudents.mutateAsync({
        name,
        surname,
        birthDate: birthDateFormatted,
        gender,
        city,
        state,
        email,
        phone
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    router.replace("/students")
  }

  const genderValue = watch('gender');

  const handleSelectGender = (selectedValue: string) => {
    setValue('gender', selectedValue, { shouldValidate: true });
  };

  return (
    <Layout>
      <div className="flex flex-row items-center justify-between space-y-4 md:space-x-4 md:space-y-0">
        <div className='flex flex-col space-y-4'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Aluno</h1>
          <small className="text-sm font-medium leading-none text-secondary-300">Registrando</small>
        </div>
        <Button onClick={handleBack} className='bg-secondary-500 hover:bg-secondary-600'>
          Cancelar
        </Button>
      </div>

      <div className='flex w-full items-center justify-center'>
        <form className="mt-8 w-full space-y-8 px-4 md:w-2/3 md:px-0" onSubmit={handleSubmit((e) => handleRegister(e))}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id='name'
                type="text"
                placeholder="Nome"
                className="placeholder:opacity-60 focus:border-primary-600 focus:outline-none"
                {...register('name')}
                errorName={errors?.name?.message}
              />
            </div>

            <div>
              <Label htmlFor="surname">Sobrenome</Label>
              <Input
                id='surname'
                type="text"
                placeholder="Sobrenome"
                className="placeholder:opacity-60 focus:border-primary-600 focus:outline-none"
                {...register('surname')}
              />
              {errors?.surname?.message && (
                <p className="text-sm text-red-500">{errors?.surname?.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <MaskedInput
                id='birthDate'
                format="##/##/####"
                placeholder="Data de Nascimento"
                className='placeholder:opacity-60 focus:border-primary-600 focus:outline-none'
                {...register('birthDate')}
              />
              {errors?.birthDate?.message && (
                <p className="text-sm text-red-500">{errors?.birthDate?.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Sexo</Label>
              <Select
                value={genderValue}
                onValueChange={(e) => handleSelectGender(e)}
              >
                <SelectTrigger id='gender' className="w-full focus:border-primary-600 focus:outline-none">
                  <SelectValue placeholder={NonGender.SEXO} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="male" value="male">Masculino</SelectItem>
                  <SelectItem key="female" value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
              {errors?.gender?.message && (
                <p className="text-sm text-red-500">{errors?.gender?.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id='state'
                placeholder="Estado"
                className="placeholder:opacity-60 focus:border-primary-600 focus:outline-none"
                {...register('state')}
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id='city'
                type="text"
                placeholder="Cidade"
                className="placeholder:opacity-60 focus:border-primary-600 focus:outline-none"
                {...register('city')}
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id='email'
                type="text"
                placeholder="E-mail"
                className="placeholder:opacity-60 focus:border-primary-600 focus:outline-none"
                {...register('email')}
              />
            </div>

            <div>
              <Label htmlFor="phone">Celular</Label>
              <MaskedInput
                id='phone'
                format="(##) #####-####"
                placeholder="Celular"
                type="text"
                className='placeholder:opacity-60 focus:border-primary-600 focus:outline-none'
                {...register('phone')}
              />
            </div>
          </div>

          <Button className="w-full bg-secondary-500 p-5 hover:bg-secondary-600 hover:text-white" type="submit">
            {UseRegisterStudents.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Registrar
          </Button>
        </form>
      </div>
    </Layout>
  );
}
