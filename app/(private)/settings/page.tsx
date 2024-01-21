"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, LogOut } from "lucide-react";
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';


import Layout from "@/components/layout/Layout";

import { useSchema } from '@/hooks/useSchema';

import { useBilling } from '@/services/hooks/useBilling';
import { useResetPassword } from '@/services/hooks/useResetPassword';
import { useSignOut } from '@/services/hooks/useSignOut';


export const dynamic = "force-dynamic";

type ResetPasswordProps = Required<z.infer<typeof useSchema.resetPassword>>;

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
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
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-extrabold md:text-4xl">Configurações</h1>
        <div className="flex flex-col space-y-4">
          <button className="btn hover:btn-error" onClick={handleSignOut}>
            Sair
            <LogOut />
          </button>
          <button className="btn hover:btn-primary" onClick={handleBilling}>
            Plano
            <CreditCard />
          </button>
        </div>
      </div>

      <div className="divider" />

      <div>
        <h1 className="text-3xl font-extrabold md:text-4xl">Alterar senha</h1>

        <form className="mt-4 flex flex-col space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <input
            required
            lang="pt"
            type="password"
            placeholder="Nova senha"
            className="input input-bordered w-full max-w-xs placeholder:opacity-60"
            {...register("password")}
          />
          <p className="text-xs">{errors.password?.message}</p>

          <button
            className="btn btn-primary w-full max-w-xs"
            type="submit"
          >
            {UseResetPassword.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Alterar
          </button>
        </form>
      </div>
    </Layout>
  );
}
