"use client";

import { useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

import apiClient from "@/libs/api";
import config from "@/config";
import logo from "@/app/icon.png";

import Modal from "./Modal";

const IS_PRODUCTION = process.env.NODE_ENV === "production"

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({
  priceId,
  mode = "payment",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
}) => {
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePayment = async () => {
    setIsLoading(true);

    const { data: { session } } = await supabase.auth.getSession()

    try {
      if (!session) {
        setIsModalOpen(true)
      } else {
        const { url }: { url: string } = await apiClient.post(
          "/stripe/create-checkout",
          {
            priceId,
            successUrl: window.location.href,
            cancelUrl: window.location.href,
            mode,
          }
        );

        window.location.href = url;
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Vamos nos cadastrar primeiro?">
        <div className="space-y-4">
          <p>Antes de iniciarmos, vamos nos cadastrar para assim iniciarmos a compra do plano?</p>
          <Link href="/sign-up" className="btn btn-primary">Iniciar cadastro</Link>
        </div>
      </Modal>

      <button
        className="btn btn-primary btn-block group"
        onClick={IS_PRODUCTION ? () => null : () => handlePayment()}
        disabled={IS_PRODUCTION ? true : false}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            priority={true}
            className="w-6 h-6"
            width={24}
            height={24}
          />
        )}
        {IS_PRODUCTION ? "WIP 🚧" : "Adquirir " + config?.appName}
      </button>
    </>
  );
};

export default ButtonCheckout;
