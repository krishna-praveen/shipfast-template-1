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
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
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
            ? process.env.STRIPE_PLAN_ESSENCIAL
            : "need_to_be_configured",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Essencial",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "A mudança começa aqui!",
        // The price you want to display, the one user will be charged on Stripe.
        price: 79.9,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 99.9,
        features: [
          { name: "Registro de aluno" },
          { name: "Registro de avaliação de aluno" },
          { name: "Registro de treino por aluno" },
          { name: "Donwload/envio de avaliação/treino por email" },
          { name: "Suporte via WahtsApp 24h" },
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
  resend: {
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: "Pump <official@gopump.co>",
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "official@gopump.co",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "official@gopump.co",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes.dark["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/sign-in",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignIn.js
    callbackUrl: "/home",
  },
} as ConfigProps;

export default config;
