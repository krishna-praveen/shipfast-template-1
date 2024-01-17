"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/Input";

import { formatBirthDate, validateDate } from "@/libs/date";

import config from "@/config";

import { findCustomerAndSubscription } from "./actions";

export default function Signup() {
  const supabase = createClientComponentClient();

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const [birthDate, setBirthDate] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (inputEmail: string) => {
    if (!inputEmail || inputEmail.trim().length === 0) {
      setEmailError("E-mail é obrigatório.");
      return false;
    }

    if (!inputEmail.includes("@")) {
      setEmailError("E-mail deve conter um @.");
      return false;
    }

    setEmailError("");

    return true;
  };

  const validateName = (inputName: string) => {
    if (!inputName || inputName.trim().length === 0) {
      setNameError("Nome é obrigatório.");
      return false;
    }

    if (inputName.length < 6) {
      setNameError("O nome deve ter pelo menos 6 caracteres.");
      return false;
    }

    setNameError("");

    return true;
  };

  const validatePassword = (inputPassword: string) => {
    if (!inputPassword || inputPassword.trim().length === 0) {
      setPasswordError("Senha é obrigatória.");
      return false;
    }

    if (inputPassword.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    setPasswordError("");

    return true;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    validateName(newName);
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatBirthDate(event.target.value);
    setBirthDate(formattedDate);
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateName(name)) {
      return;
    }

    if (!validateDate(birthDate)) {
      setBirthDateError("Formato de data inválido. Use DD/MM/YYYY.");
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    setBirthDateError("");
    setIsLoading(true);

    try {
      const emailRedirectTo = window.location.origin + "/home";

      const { customer, subscription } = await findCustomerAndSubscription(email)

      if (!customer && !subscription) {
        toast.error("Por favor, adquire o seu plano primeiro, ou utilize o mesmo email que você utilizou para a compra do plano.", { position: "top-center", duration: 10000, icon: '❌' })
        return
      }

      const { data: { user } } = await supabase.auth.signUp({
        email,
        password,
        phone,
        options: {
          data: {
            name,
            birthDate
          },
          emailRedirectTo
        }
      })

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert(
          {
            id: user.id,
            price_id: subscription.items.data[0].price.id,
            email,
            has_access: true,
            customer_id: customer.id
          },
        );
      }

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
  };

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
        onSubmit={(e) => handleSignup(e)}
      >
        <Input
          type="text"
          value={name}
          placeholder="Seu nome"
          onChange={handleNameChange}
          errorName={nameError}
        />

        <Input
          type="text"
          value={birthDate}
          placeholder="Data de nascimento"
          onChange={handleBirthDateChange}
          errorName={birthDateError}
        />

        <Input
          type="text"
          value={phone}
          placeholder="Seu número (opcional)"
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          type="email"
          value={email}
          placeholder="Seu e-mail"
          onChange={handleEmailChange}
          errorName={emailError}
          autoComplete="email"
        />

        <Input
          type="password"
          value={password}
          placeholder="Sua senha"
          onChange={handlePasswordChange}
          errorName={passwordError}
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