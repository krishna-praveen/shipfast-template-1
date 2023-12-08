"use client";

import Link from "next/link";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from "next/navigation";

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function Signup() {
  const supabase = createClientComponentClient();

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isValidDate = (date: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(date);
  };

  const formatBirthDate = (input: string) => {
    let formatted = input.replace(/[^\d]/g, "");

    if (formatted.length >= 3 && formatted.length <= 4) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    } else if (formatted.length > 4) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4) + "/" + formatted.slice(4, 8);
    }
    return formatted;
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatBirthDate(event.target.value);
    setBirthDate(formattedDate);
  };


  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidDate(birthDate)) {
      setBirthDateError("Formato de data inválido. Use DD/MM/YYYY.");
      return;
    }

    setBirthDateError("");
    setIsLoading(true);

    try {
      await supabase.auth.signUp({
        email,
        password,
        phone,
        options: {
          data: {
            name
          }
        }
      })

      toast.success("Cadastrado com sucesso.");

      setIsDisabled(true);

      router.replace("/sign-in")

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 md:p-24" data-theme={config.colors.theme}>

      <div className="text-center mb-4">
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
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

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
        Cadastrar
      </h1>

      <form
        className="form-control w-full space-y-4"
        onSubmit={(e) => handleSignup(e)}
      >
        <input
          required
          type="text"
          value={name}
          placeholder="Seu nome"
          className="input input-bordered w-full placeholder:opacity-60"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          type="text"
          value={birthDate}
          placeholder="Data de nascimento"
          className={`input input-bordered w-full placeholder:opacity-60 ${birthDateError ? 'input-error' : ''}`}
          onChange={handleBirthDateChange}
        />
        {birthDateError && (
          <p className="text-red-500 text-sm">{birthDateError}</p>
        )}

        <input
          type="text"
          value={phone}
          placeholder="Seu número (opcional)"
          className="input input-bordered w-full placeholder:opacity-60"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          required
          type="email"
          value={email}
          autoComplete="email"
          placeholder="Seu e-mail"
          className="input input-bordered w-full placeholder:opacity-60"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          value={password}
          placeholder="Sua senha"
          className="input input-bordered w-full placeholder:opacity-60"
          onChange={(e) => setPassword(e.target.value)}
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