"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from "@/components/ui/Input";
import { Label } from '@/components/ui/Label';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import { useSchema } from '@/hooks/useSchema';

import { useSignUp } from '@/services/hooks/useSignUp';

type SignUpProps = Required<z.infer<typeof useSchema.signUp>>

export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpProps>({
    resolver: zodResolver(useSchema.signUp),
  });

  const handleSubmitSingUp: SubmitHandler<SignUpProps> = async ({ email, password, phone, name, birthDate }) => {
    const emailRedirectTo = window.location.origin + "/home";

    try {
      setIsLoading(true);

      await useSignUp({
        email,
        password,
        phone,
        name,
        birthDate,
        emailRedirectTo
      })

      toast.success("Conta criada com sucesso. Email para confirmação já foi enviado pra sua caixa de entrada.", { position: "top-center", duration: 5000, icon: '✅' })

      setIsDisabled(true);

      router.replace("/")
    } catch (error) {
      if (process.env.VERCEL_ENV !== 'production') {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900">
      <Tabs defaultValue="sign-up" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="sign-up">Registrar</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <Card className="bg-zinc-900">
            <CardHeader>
              <CardTitle>Registrar</CardTitle>
              <CardDescription>
                Insira as informações necessárias para ter acesso a nossa
                plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="name">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('name')}
                  errorName={errors?.name?.message}
                />
              </div>

              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="surname">
                  Sobrenome
                </Label>
                <Input
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Seu sobrenome"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('surname')}
                  errorName={errors?.surname?.message}
                />
              </div>

              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="birthDate">
                  Data de Nascimento
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="text"
                  placeholder="Sua data de nascimento"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('birthDate')}
                  errorName={errors?.birthDate?.message}
                />
              </div>

              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="phone">
                  Número do Celular
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Seu número de celular"
                  className="mt-2 w-full rounded-lg border-2 bg-zinc-800 px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
                  {...register('phone')}
                  errorName={errors?.phone?.message}
                />
              </div>

              <div className="space-y-1">
                <Label className="block text-sm font-bold text-white" htmlFor="email">
                  Email
                </Label>
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
                <Label className="block text-sm font-bold text-white" htmlFor="password">
                  Senha
                </Label>
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
              <form onSubmit={handleSubmit(handleSubmitSingUp)}>
                <Button disabled={isLoading || isDisabled} type="submit">
                  {isLoading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )} Registrar
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  );
}
