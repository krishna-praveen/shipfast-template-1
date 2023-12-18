import themes from "daisyui/src/theming/themes.js";

import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "Pump",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Responsável por trazer soluções para o mundo de exercício físico auxiliando Personal Trainers.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "pump",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.STRIPE_PLAN_STARTER
            : "need_to_be_configured",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Plano Starter",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Comece com o essencial",
        // The price you want to display, the one user will be charged on Stripe.
        price: 39.9,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        // priceAnchor: 29,
        options: {
          student: {
            quantity: 20,
          },
          assessment: {
            quantity: 6,
          },
          workouts: {
            quantity: 6,
          },
        },
        features: [
          { name: "Registro de alunos" },
          { name: "Registro e avaliação de aluno" },
          { name: "Registro de treino por aluno" },
          { name: "Geração e download de PDF (avaliação/treino)" },
          { name: "Suporte por WhatsApp" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.STRIPE_PLAN_BOOSTER
            : "need_to_be_configured",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Plano Booster",
        description: "Acelere seu crescimento",
        price: 69.9,
        options: {
          student: {
            quantity: 40,
          },
          assessment: {
            quantity: 12,
          },
          workouts: {
            quantity: 12,
          },
        },
        // priceAnchor: 49,
        features: [
          { name: "Todas as funcionalidades do Plano Starter" },
          { name: "Envio de PDF por email" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.STRIPE_PLAN_MASTER
            : "need_to_be_configured",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        name: "Plano Master",
        description: "Domine o mercado",
        price: 99.9,
        options: {
          student: {
            quantity: 60,
          },
          assessment: {
            quantity: 24,
          },
          workouts: {
            quantity: 24,
          },
        },
        features: [
          { name: "Todas as funcionalidades do Plano Booster" },
          { name: "O PDF com a sua logotipo" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `ShipFast <noreply@mg.shipfa.st>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Marc at ShipFast <marc@mg.shipfa.st>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "official@gopump.co",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "marc.louvion@gmail.com",
  },
  resend: {
    fromAdmin: "Pump <official@gopump.co>",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=dark]`]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/sign-in",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignIn.js
    callbackUrl: "/home",
  },
} as ConfigProps;

export default config;
