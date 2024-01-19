"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreditCard, LogOut } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Layout from "@/components/layout/Layout";

import apiClient from "@/services/api";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Settings() {
  const supabase = createClientComponentClient();
  const [newPassword, setNewPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>()

  const handleSignOut = async () => {
    await supabase.auth.signOut({ scope: "global" });
    window.location.href = "/";
  };

  const handleBilling = async () => {
    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-portal",
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setIsLoading(true);

    const { data, error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      toast.error(`Erro ao trocar a senha.`, { position: "top-right" })
      console.error(JSON.stringify(error))
    }

    if (data.user) {
      toast.success("Sucesso ao trocar a senha.", { position: "top-right" })
      setNewPassword("")
    }

    setIsLoading(false)
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-extrabold md:text-4xl">Configurações</h1>
        <div className="flex flex-col space-y-4">
          <button className="btn hover:btn-error" onClick={handleSignOut}>
            Sair
            <LogOut />
          </button>
          <button className="btn hover:btn-primary" onClick={handleBilling}>
            Plano
            <CreditCard />
          </button>
        </div>
      </div>

      <div className="divider" />

      <div>
        <h1 className="text-3xl font-extrabold md:text-4xl">Alterar senha</h1>

        <form className="mt-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            required
            lang="pt"
            type="password"
            value={newPassword}
            placeholder="Nova senha"
            className="input input-bordered w-full max-w-xs placeholder:opacity-60"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-xs">A senha deve conter no mínimo 6 caracteres.</p>

          <button
            className="btn btn-primary w-full max-w-xs"
            type="submit"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Alterar
          </button>
        </form>
      </div>
    </Layout>
  );
}
