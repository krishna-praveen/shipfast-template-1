"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, LogOut } from "lucide-react";
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';

import Layout from "@/components/layout/Layout";

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/separator';
import { useSchema } from '@/hooks/useSchema';

import { useBilling } from '@/services/hooks/useBilling';
import { useResetPassword } from '@/services/hooks/useResetPassword';
import { useSignOut } from '@/services/hooks/useSignOut';

export const dynamic = "force-dynamic";

type ResetPasswordProps = Required<z.infer<typeof useSchema.resetPassword>>;

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    resolver: zodResolver(useSchema.resetPassword),
  });

  const UseBilling = useBilling({
    options: {
      onSuccess: (data) => {
        window.location.href = data.url
      },
      onError: (error) => {
        toast.error(`Erro ao trocar a senha.`, { position: "top-right" })
        if (process.env.NODE_ENV === 'development') {
          console.error(JSON.stringify(error))
        }
      }
    }
  });

  const UseResetPassword = useResetPassword({
    options: {
      onSuccess: (data) => {
        if (data.user && data.session) {
          toast.success("Senha atualizada com sucesso!", { position: "top-right" });
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    }
  })

  const handleSignOut = async () => {
    await useSignOut()
    window.location.href = "/";
  };

  const handleBilling = async () => {
    try {
      await UseBilling.mutateAsync({ url: window.location.href });

    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
    }
  };

  const handleOnSubmit: SubmitHandler<ResetPasswordProps> = async ({ password }) => {
    try {
      await UseResetPassword.mutateAsync({ password });

    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-row items-center justify-between space-y-4 md:space-x-4 md:space-y-0">
        <div className='flex flex-col space-y-4'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Aluno</h1>
        </div>

        <div className="flex flex-col space-y-4">
          <Button className="bg-secondary-500 hover:bg-secondary-600" onClick={handleSignOut}>
            Sair
            <LogOut className='ml-2 size-4' />
          </Button>
          <Button className="bg-secondary-500 hover:bg-secondary-600" onClick={handleBilling}>
            Plano
            <CreditCard className='ml-2 size-4' />
          </Button>
        </div>
      </div>

      <Separator className='my-8 border-2 border-secondary-500' />

      <div>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Alterar senha
        </h2>

        <form className="mt-4 flex flex-col space-y-2" onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            required
            lang="pt"
            type="password"
            placeholder="Nova senha"
            className="input-bordered w-full max-w-xs border-secondary-500 placeholder:opacity-60"
            {...register("password")}
          />
          <p className="text-xs">{errors.password?.message}</p>

          <Button
            className="w-full max-w-xs bg-secondary-500 hover:bg-secondary-600"
            type="submit"
          >
            {UseResetPassword.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Alterar
          </Button>
        </form>
      </div>
    </Layout>
  );
}
