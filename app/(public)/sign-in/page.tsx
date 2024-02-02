"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/Tabs";

import { useSchema } from '@/hooks/useSchema';

import { useRequestResetPassword } from "@/services/hooks/useRequestResetPassword";
import { useSignIn } from '@/services/hooks/useSingIn';

type SignInProps = Required<z.infer<typeof useSchema.singIn>>;
type RequestResetPasswordProps = Required<z.infer<typeof useSchema.requestResetPassword>>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<SignInProps>({
    resolver: zodResolver(useSchema.singIn),
  });

  const {
    register: requestResetPasswordRegister,
    handleSubmit: handleRequestResetPasswordSubmit,
    formState: { errors: requestResetPasswordErrors },
  } = useForm<RequestResetPasswordProps>({
    resolver: zodResolver(useSchema.requestResetPassword),
  });

  const router = useRouter();

  const UseSignIn = useSignIn({
    options: {
      onSuccess: (data) => {
        if (data.user && data.session) {
          toast.success("Login realizado com sucesso!", { position: "top-right" });
          router.replace("/home");
        }
      },
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      }
    }
  });

  const UseRequestResetPassword = useRequestResetPassword({
    options: {
      onSuccess: () => {
        toast.success("Email para realizar restauração da senha enviado!", { position: "top-right" });
        router.push("/sign-in")
      },
      onError: (error) => {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    }
  });

  const onSubmit: SubmitHandler<SignInProps> = async ({ email, password }) => {
    try {
      await UseSignIn.mutateAsync({ email, password });

    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
    }
  };

  const onRequestResetPasswordSubmit: SubmitHandler<RequestResetPasswordProps> = async ({ email }) => {
    try {
      await UseRequestResetPassword.mutateAsync({ email });

    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="request-reset-password">Esqueceu a senha</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card className="bg-zinc-900">
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>
                Insira seu e-mail e senha para acessar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('email')}
                  errorName={errors?.email?.message}
                />
              </div>
              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('password')}
                  errorName={errors?.password?.message}
                />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button type="submit">Entrar</Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="request-reset-password">
          <Card className="bg-zinc-900">
            <CardHeader>
              <CardTitle>Nova senha</CardTitle>
              <CardDescription>
                Insira o seu e-mail para receber um link de recuperação de senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new-password" >Seu e-mail</Label>
                <Input
                  id="new-password"
                  type="email"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...requestResetPasswordRegister('email')}
                  errorName={requestResetPasswordErrors?.email?.message}
                />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleRequestResetPasswordSubmit(onRequestResetPasswordSubmit)}>
                <Button
                  type="submit"
                  disabled={UseRequestResetPassword.isLoading}
                >
                  {UseRequestResetPassword.isLoading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )}
                  Solicitar
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={() => router.replace("/")} className="mt-4 w-96 space-x-2">
        {/* <ArrowLeft className="h-8 w-8 text-white" /> */}
        <h2>Voltar</h2>
      </Button>
    </div>
  );
}
