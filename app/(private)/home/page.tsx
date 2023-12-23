"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import { Modal } from "@/components/ui/Modal";

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

  return (
    <Layout>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Faça sua inscrição!" isStatic={true}>
        <div className="space-y-4">
          <p>Agora que finalizamos o seu cadastro, o que você de escolhermos o plano que você mais se identificou?</p>
          <Link href="/#pricing" className="btn btn-primary">Escolher Plano</Link>
        </div>
      </Modal>

      <h1 className="text-3xl font-extrabold md:text-4xl">Home</h1>
    </Layout>
  );
}
