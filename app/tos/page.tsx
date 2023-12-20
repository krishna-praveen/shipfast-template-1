import Link from "next/link";

import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://gopump.co
// - Name: Pump
// - Contact information: official@gopump.co
// - Description: An application responsible for help Personal Trainers and People that like to go to the gym improve their performance.
// - Ownership: when buying a plan/subscription, users can interact with many features. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email, phone and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://gopump.co/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="mx-auto max-w-xl">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
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
          Voltar
        </Link>
        <h1 className="pb-6 text-3xl font-extrabold">
          Termos e Condições de Uso do {config.appName}
        </h1>

        <pre
          className="whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Última atualização: 12/12/2023

Bem-vindo ao Pump (https://gopump.co). Estes Termos e Condições de Uso ("Termos") regem o uso do nosso aplicativo, que visa ajudar treinadores pessoais e pessoas que frequentam academias a melhorarem seu desempenho. Ao acessar ou usar o Pump, você concorda em cumprir estes Termos.

1. Informações de Contato

Para quaisquer dúvidas ou informações, entre em contato conosco pelo e-mail official@gopump.co.

2. Propriedade e Uso do Serviço

Ao adquirir um plano ou assinatura no Pump, você tem acesso a diversas funcionalidades. Caso não esteja satisfeito, oferecemos um reembolso integral dentro de 7 dias após a compra.

3. Coleta de Dados

Coletamos dados pessoais, como nome, e-mail, telefone e informações de pagamento. Também utilizamos cookies da web para coletar dados não pessoais. Mais informações podem ser encontradas em nossa Política de Privacidade: https://gopump.co/privacy-policy.

4. Lei Aplicável

Estes Termos são regidos pelas leis do Brasil.

5. Alterações nos Termos

Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. Informaremos sobre alterações significativas através do e-mail fornecido por você.

6. Aceitação dos Termos

Ao usar o Pump, você declara que leu, entendeu e concordou em estar vinculado a estes Termos.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
