"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Input } from "@/components/ui/Input";

import { useSchema } from '@/hooks/useSchema';

import { useResetPassword } from '@/services/hooks/useResetPassword';

import config from "@/config";

type ResetPasswordProps = Required<z.infer<typeof useSchema.resetPassword>>;

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    resolver: zodResolver(useSchema.resetPassword),
  });

  const router = useRouter()
  const UseResetPassword = useResetPassword({
    options: {
      onSuccess: (data) => {
        if (data.user && data.session) {
          toast.success("Senha atualizada com sucesso!", { position: "top-right" });
          router.replace("/sign-in")
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    }
  })

  const onSubmit: SubmitHandler<ResetPasswordProps> = async ({ password }) => {
    try {
      await UseResetPassword.mutateAsync({ password });

    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
    }
  };

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>
      <div className="mb-4 text-center">
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
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
        Nova senha
      </h1>

      <div className="mx-auto max-w-xl space-y-8">
        <form
          className="form-control w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="password"
              placeholder="Sua nova senha"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('password')}
              errorName={errors?.password?.message}
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            disabled={UseResetPassword.isLoading}
            type="submit"
          >
            {UseResetPassword.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Resetar
          </button>
        </form>
      </div>
    </main>
  );
}
