"use client";

import Link from "next/link";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import config from "@/config";
import { SignInSchema } from "@/libs/schema";
import { Input } from "@/components/Input";

type Inputs = z.infer<typeof SignInSchema>;

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function SignIn() {
  const supabase = createClientComponentClient();

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

  const onSubmit: SubmitHandler<Inputs> = async (event) => {
    setIsLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: String(event.email),
        password: String(event.password),
      });

      if (error) {
        toast.error("Por favor, verifique se seu email e senha estão corretos.", { position: "top-right" });
        setIsDisabled(false);
      } else if (data.user && data.session) {
        toast.success("Login realizado com sucesso!", { position: "top-right" });
        await router.replace("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado.", { position: "top-right" });
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
