"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { z } from 'zod';

import { Input } from "@/components/ui/Input";
import { useSchema } from '@/hooks/useSchema';

import { useSignUp } from '@/services/hooks/useSignUp';

import config from "@/config";
type SignUpProps = Required<z.infer<typeof useSchema.signUp>>


export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpProps>({
    resolver: zodResolver(useSchema.signUp),
  });

  const handleSubmitSingUp: SubmitHandler<SignUpProps> = async ({ email, password, phone, name, birthDate }) => {
    const emailRedirectTo = window.location.origin + "/#pricing";

    try {
      await useSignUp({
        email,
        password,
        phone,
        name,
        birthDate,
        emailRedirectTo
      })

      toast.success("Confirme o cadastro no seu e-mail. E finalize a compra.", { position: "top-center", duration: 5000, icon: '✅' })

      setIsDisabled(true);

      router.replace("/")
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>

      <div className="mb-4 text-center">
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Sign-in
        </Link>
      </div>

      <h1 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
        Cadastrar
      </h1>

      <form
        className="form-control w-full space-y-4"
        onSubmit={handleSubmit((e) => handleSubmitSingUp(e))}
      >
        <Input
          type="text"
          placeholder="Seu nome"
          errorName={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="text"
          placeholder="Data de nascimento"
          errorName={errors.birthDate?.message}
          {...register('birthDate')}
        />

        <Input
          type="text"
          placeholder="Seu número (opcional)"
          errorName={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          type="email"
          placeholder="Seu e-mail"
          autoComplete="email"
          errorName={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Sua senha"
          errorName={errors.password?.message}
          {...register('password')}
        />

        <button
          className="btn btn-primary btn-block"
          disabled={isLoading || isDisabled}
          type="submit"
        >
          {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Cadastrar
        </button>
      </form>
    </main >
  );
}
