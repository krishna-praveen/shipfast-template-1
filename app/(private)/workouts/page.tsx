"use client"

import { useRouter } from "next/navigation";

import Layout from "@/components/Layout";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Workouts() {
  const router = useRouter()

  const handleRegister = () => {
    router.replace("/workouts/register")
  }

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold md:text-4xl">Treinos</h1>

      <button className="btn mt-8 hover:bg-indigo-600 hover:text-white" onClick={handleRegister}>
        Registrar Treino
      </button>
    </Layout>
  );
}
