"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import React from "react";
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  isStatic?: boolean;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  classNamePanel?: string;
  classNameDialog?: string;
}

// A simple modal component which can be shown/hidden with a boolean and a function
// Because of the setIsModalOpen function, you can't use it in a server component.
export const ModalScalable = ({ isModalOpen, onClose, title = "I'm a modal", showCloseButton, classNameDialog, subtitle, isStatic = false, children, classNamePanel }: ModalProps) => {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className={twMerge("fixed z-50", classNameDialog)}
        static={isStatic}
        onClose={() => isStatic ? null : onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-base-300 fixed inset-0 bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
          <div className="flex min-h-full items-start justify-center overflow-hidden p-2 md:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={twMerge("bg-base-100 relative size-full max-w-min overflow-visible rounded-xl border border-gray-700  bg-zinc-900 p-4 text-left align-middle shadow-xl transition-all ", classNamePanel)}>
                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title as="h2" className='flex flex-col font-semibold'>
                    {title}
                    {subtitle && <span className='mt-1 text-sm font-light text-gray-400'>{subtitle}</span>}
                  </Dialog.Title>
                  {
                    !showCloseButton ? null : (
                      <button
                        className="btn btn-square btn-ghost btn-sm"
                        onClick={onClose}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    )
                  }
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
