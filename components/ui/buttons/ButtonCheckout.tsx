"use client";

import Link from "next/link";
import { useState } from "react";

import apiClient from "@/services/api";

import config from "@/config";

import { Modal } from "../../ui/Modal";
import { Button } from "../Button";

const IS_PRODUCTION = process.env.VERCEL_ENV === "production"

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
export const ButtonCheckout = ({
  priceId,
  mode = "payment",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
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

      <Button
        className="bg-secondary-500 text-secondary-foreground shadow hover:bg-secondary-600"
        onClick={IS_PRODUCTION ? () => null : () => handlePayment()}
        disabled={IS_PRODUCTION ? true : false}
      >
        {IS_PRODUCTION ? "WIP 🚧" : "Adquirir " + config?.appName}
      </Button>
    </>
  );
};
