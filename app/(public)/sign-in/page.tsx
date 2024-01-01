"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Input } from "@/components/ui/Input";

import apiClient from "@/libs/api";
import { SignInSchema } from "@/libs/schema";

import config from "@/config";

type Inputs = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<Inputs>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true);

    try {
      const { data } = await apiClient.post("/auth/sign-in", {
        email,
        password
      })

      if (data.user && data.session) {
        toast.success("Login realizado com sucesso!", { position: "top-right" });
        await router.replace("/home");
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

      setIsDisabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>

      <div className="mb-4 text-center">
        <Link href="/" className="btn btn-ghost btn-sm">
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
          Home
        </Link>
      </div>

      <h1 className="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
        Entrar no {config.appName}{" "}
      </h1>

      <div className="mx-auto max-w-xl space-y-8">
        <form
          className="form-control w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Seu e-mail"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('email')}
              errorName={errors?.email?.message}
            />
          </div>

          <div>
            <Input
              name="password"
              type="password"
              placeholder="Sua senha"
              className="input input-bordered w-full placeholder:opacity-60"
              {...register('password')}
              errorName={errors?.password?.message}
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            disabled={isLoading || isDisabled}
            type="submit"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Entrar
          </button>
          <Link href="/request-reset-password" className="link-hover link text-xs hover:text-blue-600">
            Esqueci a senha
          </Link>

          <div className="text-left">
            <Link href="/sign-up" className="link-hover link">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
