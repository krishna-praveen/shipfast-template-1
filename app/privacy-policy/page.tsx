import Link from "next/link";

import { getSEOTags } from "@/libs/seo";

import config from "@/config";


// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://gopump.co
// - Name: Pump
// - Description: An application responsible for help Personal Trainers and People that like to go to the gym improve their performance.
// - User data collected: name, email, phone, and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: To know better our clients
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: official@gopump.co

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="mx-auto max-w-xl">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Voltar
        </Link>
        <h1 className="pb-6 text-3xl font-extrabold">
          Política de Privacidade do {config.appName}
        </h1>

        <pre
          className="whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Última atualização: 12/12/2023

Bem-vindo ao Pump (https://gopump.co), um aplicativo dedicado a ajudar treinadores pessoais e entusiastas da fitness a melhorarem seu desempenho. Sua privacidade é de extrema importância para nós. Esta Política de Privacidade delineia os tipos de informações que coletamos, como as utilizamos e as medidas que tomamos para protegê-las.

1. Coleta e Uso de Informações

Coletamos os seguintes tipos de informações:

Dados Pessoais: Isso inclui seu nome, endereço de e-mail, número de telefone e informações de pagamento. Coletamos esses dados para entender melhor e atender nossos clientes.

Dados Não Pessoais: Utilizamos cookies da web para melhorar sua experiência em nosso site. Esses cookies nos ajudam a entender o comportamento do usuário em nosso site, mas não coletam informações pessoais.

2. Finalidade da Coleta de Dados

O objetivo principal da coleta de dados é aprimorar nossos serviços e proporcionar uma experiência personalizada para nossos usuários. Entender nossos clientes nos ajuda a melhorar nosso aplicativo e oferecer orientação e suporte mais personalizados.

3. Compartilhamento e Divulgação de Dados

O Pump respeita sua privacidade. Não compartilhamos seus dados pessoais com terceiros. Qualquer dado coletado é exclusivamente para o propósito de aprimorar nosso serviço e não é compartilhado externamente.

4. Privacidade Infantil

Nossos serviços não são direcionados a crianças menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças. Se tomarmos conhecimento de que recebemos inadvertidamente informações pessoais de uma criança menor de 13 anos, excluiremos tais informações de nossos registros.

5. Alterações na Nossa Política de Privacidade

Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página e atualizando a data de "Última atualização". Você também será informado sobre quaisquer mudanças significativas por meio do endereço de e-mail que nos forneceu.

6. Fale Conosco

Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em official@gopump.co.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
