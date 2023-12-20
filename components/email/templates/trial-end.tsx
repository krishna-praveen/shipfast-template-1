import * as React from 'react';

interface TrialEndTemplateProps {
  userName: string;
  trialEndDate: string;
  manageSubscriptionUrl: string;
}

export const TrialEndTemplate: React.FC<Readonly<TrialEndTemplateProps>> = ({
  userName,
  trialEndDate,
  manageSubscriptionUrl,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' }}>
    <h2 style={{ color: '#007bff' }}>Olá, {userName}!</h2>
    <p>
      Queremos informar que seu período de teste gratuito em nossa plataforma está chegando ao fim. A data final do seu teste é <strong>{trialEndDate}</strong>.
    </p>
    <p>
      Se você gostou de usar nosso serviço e deseja continuar sem interrupções, recomendamos que atualize seus detalhes de pagamento o mais rápido possível.
    </p>
    <p>
      Para gerenciar sua assinatura, incluindo a atualização de detalhes de pagamento, por favor visite o link abaixo:
    </p>
    <a href={manageSubscriptionUrl} style={{ display: 'inline-block', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
      Gerenciar Minha Assinatura
    </a>
    <p>
      Caso tenha alguma dúvida ou precise de assistência, não hesite em nos contactar.
    </p>
    <p>
      Agradecemos por experimentar nosso serviço!
    </p>
    <footer>
      <p>Atenciosamente,</p>
      <p>Equipe Pump</p>
    </footer>
  </div>
);

