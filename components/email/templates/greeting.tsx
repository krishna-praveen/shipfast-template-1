import * as React from 'react';

interface GreetingTemplateProps {
  firstName: string;
}

export const GreetingTemplate: React.FC<Readonly<GreetingTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
