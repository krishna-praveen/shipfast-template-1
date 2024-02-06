"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

import apiClient from "@/services/api";

import { Input } from "../Input";

export const ButtonScheduleDemo = ({ extraStyle }: { extraStyle?: string }) => {
  const [formData, setFormData] = useState({ email: "", name: "", surname: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await apiClient.post("/schedule-demo", formData);

      toast.success("Sua demonstração foi agendada com sucesso!");
      setFormData({ email: "", name: "", surname: "" });
      setIsDisabled(true);
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro ao agendar a demonstração.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className={`space-y-4 ${extraStyle ? extraStyle : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="space-y-1">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Seu e-mail"
          className="mt-2 w-full rounded-lg border-2 bg-white px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row space-x-6">
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            className="mt-2 w-full rounded-lg border-2 bg-white px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Input
            id="surname"
            name="surname"
            type="text"
            placeholder="Sobrenome"
            className="mt-2 w-full rounded-lg border-2 bg-white px-4 py-2 text-white focus:border-primary-600 focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="flex w-full justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Agendar Demonstração
        {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      </button>
    </form>
  );
};
