"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { TextInput } from '@/components/ui/Form/TextInput';
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/Tabs";

import { useSchema } from '@/hooks/useSchema';

import { useRequestResetPassword } from "@/services/hooks/useRequestResetPassword";
import { useSignIn } from '@/services/hooks/useSingIn';

type SignInProps = Required<z.infer<typeof useSchema.singIn>>;
type RequestResetPasswordProps = Required<z.infer<typeof useSchema.requestResetPassword>>;

export default function SignIn() {
  const router = useRouter();

  const methodsSignIn = useForm<SignInProps>({
    resolver: zodResolver(useSchema.singIn),
  });

  const methodsRequestResetPassword = useForm<RequestResetPasswordProps>({
    resolver: zodResolver(useSchema.requestResetPassword),
  });

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

  const onSingInSubmit: SubmitHandler<SignInProps> = async ({ email, password }) => {
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
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger className="px-4" value="request-reset-password">Nova Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <form onSubmit={methodsSignIn.handleSubmit(onSingInSubmit)}>
            <FormProvider {...methodsSignIn}>
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Entrar</CardTitle>
                  <CardDescription>
                    Insira seu e-mail e senha para acessar sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <TextInput
                      name="email"
                      type='email'
                      label='E-mail'
                      placeholder="Seu e-mail"
                      className="mt-2 w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <TextInput
                      name="password"
                      type='password'
                      label='Senha'
                      placeholder="Sua senha"
                      className="mt-2 w-full rounded-lg"
                    />

                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Entrar</Button>
                </CardFooter>
              </Card>
            </FormProvider>
          </form>
        </TabsContent>

        <TabsContent value="request-reset-password">
          <form onSubmit={methodsRequestResetPassword.handleSubmit(onRequestResetPasswordSubmit)}>
            <FormProvider {...methodsSignIn}>
              <Card className="bg-zinc-900">
                <CardHeader>
                  <CardTitle>Nova senha</CardTitle>
                  <CardDescription>
                    Insira o seu e-mail para receber um link de recuperação de senha.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <TextInput
                      name='email'
                      type='email'
                      label='Seu e-mail'
                      placeholder='Seu e-mail'
                      className="mt-2 w-full rounded-lg"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={UseRequestResetPassword.isLoading}
                  >
                    {UseRequestResetPassword.isLoading && (
                      <span className="loading loading-spinner loading-xs"></span>
                    )}
                    Solicitar
                  </Button>
                </CardFooter>
              </Card>
            </FormProvider>
          </form>
        </TabsContent>
      </Tabs>

      <Button onClick={() => router.replace("/")} className="mt-4 w-96 space-x-2">
        <h2>Voltar para página inicial</h2>
      </Button>
    </div>
  );
}
