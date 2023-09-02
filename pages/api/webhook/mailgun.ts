import { sendEmail } from '@/libs/mailgun';
import config from '@/config';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const emailData = req.body;

      try {
        // extract the email content, subject and sender
        const { 'stripped-text': strippedText, subject, sender } = emailData;

        // send email to the admin if forwardRepliesTo is et & emailData exists
        if (
          config.mailgun.forwardRepliesTo &&
          strippedText &&
          subject &&
          sender
        ) {
          await sendEmail({
            to: config.mailgun.forwardRepliesTo,
            subject: `${config?.appName} | ${subject}`,
            text: `Subject: ${subject}\n\nFrom: ${sender}\n\nContent:\n${strippedText}`,
            html: `<div><p>Subject: ${subject}</p><p>From: ${sender}</p><p>Content:</p><p>${strippedText}</p></div>`,
            replyTo: sender,
          });
        }

        return res.status(200).send('OK');
      } catch (e) {
        console.error(e?.message);

        return res.status(500).send('Internal Server Error');
      }
    }
    default:
      return res.status(200).send('OK');
  }
}
