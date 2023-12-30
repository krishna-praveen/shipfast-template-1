"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import { Modal } from "@/components/ui/Modal";

import apiClient from "@/libs/api";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server component which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Home() {
  const supabase = createClientComponentClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const profile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .filter("has_access", "eq", true)
        .single();

      if (!profile.data) {
        setIsModalOpen(true)
      }
    }

    fetchProfile()
  }, [supabase])


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

  return (
    <Layout>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Faça sua inscrição!" isStatic={true}>
        <div className="space-y-4">
          <p>Agora que finalizamos o seu cadastro, o que você de escolhermos o plano que você mais se identificou?</p>
          <button onClick={handleBilling} className="btn btn-primary">Escolher Plano</button>
        </div>
      </Modal>

      <h1 className="text-3xl font-extrabold md:text-4xl">Home</h1>
    </Layout>
  );
}
