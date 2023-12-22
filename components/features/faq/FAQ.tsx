"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "Como eu posso adquirir o Pump?",
    answer: <div className="space-y-2 leading-relaxed">Você pode adquirir o Pump através de planos, e cada plano terá um valor. Só existe uma única forma de pagamento: cartão de crédito.</div>,
  },
  {
    question: "Posso obter um reembolso?",
    answer: (
      <p>
        Sim! Você pode solicitar um reembolso no prazo de 7 dias após a compra. Contate-nos por email.
      </p>
    ),
  },
  {
    question: "Eu tenho outra pergunta",
    answer: (
      <div className="space-y-2 leading-relaxed">Legal, contate-nos pelo email.</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex w-full items-center gap-2 border-t border-base-content/10 py-5 text-left text-base font-semibold md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`ml-auto h-4 w-4 shrink-0 fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center transition duration-200 ease-out${isOpen && "rotate-180"
              }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transition duration-200 ease-out${isOpen && "hidden rotate-180"
              }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`overflow-hidden opacity-80 transition-all duration-300 ease-in-out`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

export const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-24 md:flex-row">
        <div className="flex basis-1/2 flex-col text-left">
          <p className="mb-4 inline-block font-semibold text-primary">FAQ</p>
          <p className="text-3xl font-extrabold text-base-content sm:text-4xl">
            Perguntas frequentes
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};
