import Layout from "@/components/Layout";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Settings() {
  return (
    <Layout>
      <h1 className="text-3xl md:text-4xl font-extrabold">Configurações</h1>
    </Layout>
  );
}
