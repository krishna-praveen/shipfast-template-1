import { Resend } from "resend";

import { GreetingTemplate } from "@/components/email/templates/greeting";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Pump <official@gopump.co>",
      to: ["thiago.adsix@gmail.com"],
      subject: "Greetings from Resend API!",
      react: GreetingTemplate({ firstName: "John" }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
