import { Resend } from "resend";
import React from "react";

import config from "@/config";

// Inicialização do cliente da Resend API
const resend = new Resend(process.env.RESEND_API_KEY || "dummy");

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === "development") {
  console.group("⚠️ RESEND_API_KEY missing from .env");
  console.error("It's not mandatory but it's required to send emails.");
  console.error("If you don't need it, remove the code from /libs/resend.ts");
  console.groupEnd();
}

/**
 * Envia um email usando os parâmetros fornecidos.
 *
 * @param {string} to - Endereço de email do destinatário.
 * @param {string} subject - Assunto do email.
 * @param {React.ReactNode} content - Conteúdo do email em formato React.
 * @returns {Promise<any>} Uma Promise que resolve quando o email é enviado.
 */
export const sendEmail = async ({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: React.ReactNode;
}): Promise<any> => {
  try {
    const emailData = {
      from: config.resend.fromAdmin,
      to: [to],
      subject,
      react: content,
    };

    const response = await resend.emails.send(emailData);
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // ou lidar com o erro conforme necessário
  }
};
