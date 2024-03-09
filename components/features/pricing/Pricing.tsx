import { CheckCircle } from "lucide-react";

import { ButtonCheckout } from "@/components/ui/buttons";

import config from "@/config";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

export const Pricing = () => {
  return (
    <section className="container flex min-h-screen flex-col items-center justify-center" id="pricing">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 flex w-full flex-col space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
            Teste grátis por 7 dias
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-secondary-500">
            cartão não obrigatório
          </h3>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {config.stripe.plans.map((plan) => (
            <div key={plan.priceId} className="relative w-full max-w-lg">
              <div className="z-10 relative flex h-full flex-col items-center gap-5 rounded-2xl border-4 border-secondary-500 p-8 lg:gap-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex w-full flex-col items-center">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-secondary-500">
                      {plan.name}
                    </h4>
                    {plan.description && (
                      <p className="text-base-content/80 mt-2">
                        {plan.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex gap-2">
                    {plan.priceAnchor && (
                      <div className="mb-[4px] flex flex-col justify-end text-lg ">
                        <p className="relative">
                          <span className="absolute inset-x-0 top-[53%] h-[2.5px] bg-secondary-400"></span>
                          <span className="text-base-content/80">
                            ${plan.priceAnchor.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col items-center">
                      <p className={`text-5xl font-extrabold tracking-tight`}>
                        R$ {plan.price.toFixed(2)}
                      </p>
                    </div>

                  </div>

                  <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight text-secondary-500">
                    por mês
                  </h4>
                </div>


                {plan.features && (
                  <ul className="flex-1 space-y-2.5 text-base leading-relaxed">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle width={16} className="text-green-500" />

                        <span>{feature.name} </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="space-y-2">
                  <ButtonCheckout priceId={plan?.priceId} mode="subscription" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
