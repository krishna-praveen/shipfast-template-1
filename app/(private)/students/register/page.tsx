/* eslint-disable no-unused-vars */
"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';


import Layout from "@/components/layout/Layout";

import { MaskedInput } from '@/components/ui/masked/MaskedInput';

import { useSchema } from '@/hooks/useSchema';
import { useRegisterStudents } from '@/services/hooks/useRegisterStudents';


export const dynamic = "force-dynamic";

type RegisterProps = Required<z.infer<typeof useSchema.registerStudents>>

enum NonGender {
  SEXO = "Sexo"
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Register() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterProps>({
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

  return (
    <Layout>
      <div className="flex flex-row items-center space-x-4">
        <ArrowLeft className="cursor-pointer hover:text-indigo-800" onClick={handleBack} />
        <h1 className="text-3xl font-extrabold md:text-4xl">Registrar Aluno</h1>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit((e) => handleRegister(e))}>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Nome"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('name')}
            />
            {errors?.name?.message && (
              <p className="text-sm text-red-500">{errors?.name?.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Sobrenome"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('surname')}
            />
            {errors?.surname?.message && (
              <p className="text-sm text-red-500">{errors?.surname?.message}</p>
            )}
          </div>

          <div>
            <MaskedInput
              format="##/##/####"
              placeholder="Data de Nascimento"
              {...register('birthDate')}
            />
            {errors?.birthDate?.message && (
              <p className="text-sm text-red-500">{errors?.birthDate?.message}</p>
            )}
          </div>

          <div>
            <select className="select select-bordered w-full" {...register('gender')}>
              <option value={NonGender.SEXO} defaultValue={NonGender.SEXO}>{NonGender.SEXO}</option>
              <option key="male" value="male">Masculino</option>
              <option key="female" value="female">Feminino</option>
            </select>
            {errors?.gender?.message && (
              <p className="text-sm text-red-500">{errors?.gender?.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Estado"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('state')}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Cidade"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('city')}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="E-mail"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('email')}
            />
          </div>

          <div>
            <MaskedInput
              format="(##) #####-####"
              placeholder="Celular"
              type="text"
              {...register('phone')}
            />
          </div>
        </div>

        <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" type="submit">
          {UseRegisterStudents.isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Registrar
        </button>

      </form>
    </Layout>
  );
}
