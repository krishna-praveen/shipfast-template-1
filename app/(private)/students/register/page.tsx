/* eslint-disable no-unused-vars */
"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Layout from "@/components/layout/Layout";

import apiClient from "@/libs/api";

export const dynamic = "force-dynamic";

enum NonGender {
  SEXO = "Sexo"
}

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Register() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState<string>("")

  const [surname, setSurname] = useState("")
  const [surnameError, setSurnameError] = useState<string>("")

  const [birthDate, setBirthDate] = useState("")
  const [birthDateError, setBirthDateError] = useState<string>("")

  const [gender, setGender] = useState("")
  const [genderError, setGenderError] = useState<string>("")

  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (event.target.value.trim()) {
      setNameError('');
    }
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);

    if (event.target.value.trim()) {
      setSurnameError('');
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);

    if (event.target.value.trim()) {
      setGenderError('');
    }
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatBirthDate(event.target.value);
    setBirthDate(formattedDate);

    if (event.target.value.trim()) {
      setBirthDateError('')
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = {
      name: '',
      surname: '',
      birthDate: '',
      gender: '',
    };

    let hasError = false;

    if (!name.trim()) {
      errors.name = "O nome é obrigatório.";
      hasError = true;
    }

    if (!surname.trim()) {
      errors.surname = "O sobrenome é obrigatório.";
      hasError = true;
    }

    if (!isValidDate(birthDate)) {
      errors.birthDate = "Formato de data inválido. Use DD/MM/YYYY.";
      hasError = true;
    }

    if (!gender || gender === NonGender.SEXO) {
      errors.gender = "Selecione um sexo.";
      hasError = true;
    }

    setNameError(errors.name);
    setSurnameError(errors.surname);
    setBirthDateError(errors.birthDate);
    setGenderError(errors.gender);

    if (hasError) return;

    setIsLoading(true);

    const birthDateFormatted = birthDate.split('/').reverse().join('-');
    try {
      await apiClient.post("/students", {
        name,
        surname,
        birthDateFormatted,
        gender,
        state,
        city,
        email,
        phone
      })

      toast.success("Cadastrado com sucesso.");

      router.replace("/students")

    } catch (error) {
      console.log(error);

      toast.error("Erro ao cadastrar, entre em contato com o suporte.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.replace("/students")
  }

  return (
    <Layout>
      <div className="flex flex-row items-center space-x-4">
        <ArrowLeft className="cursor-pointer hover:text-indigo-800" onClick={handleBack} />
        <h1 className="text-3xl font-extrabold md:text-4xl">Registrar Aluno</h1>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleRegister}>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              type="text"
              value={name}
              placeholder="Nome"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="text-sm text-red-500">{nameError}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={surname}
              placeholder="Sobrenome"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={handleSurnameChange}
            />
            {surnameError && (
              <p className="text-sm text-red-500">{surnameError}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={birthDate}
              placeholder="Data de Nascimento"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={(e) => handleBirthDateChange(e)}
            />
            {birthDateError && (
              <p className="text-sm text-red-500">{birthDateError}</p>
            )}
          </div>

          <div>
            <select className="select select-bordered w-full" onChange={handleGenderChange}>
              <option value={NonGender.SEXO} defaultValue={NonGender.SEXO}>{NonGender.SEXO}</option>
              <option key="male" value="male">Masculino</option>
              <option key="female" value="female">Feminino</option>
            </select>
            {genderError && (
              <p className="text-sm text-red-500">{genderError}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={state}
              placeholder="Estado"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              value={city}
              placeholder="Cidade"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              value={email}
              placeholder="E-mail"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              value={phone}
              placeholder="Celular"
              className="input input-bordered w-full placeholder:opacity-60"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" type="submit">
          {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Registrar
        </button>

      </form>
    </Layout>
  );
}
