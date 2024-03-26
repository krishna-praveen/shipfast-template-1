import React, { FC } from 'react'

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface ModalDestructiveProps {
  isOpen: boolean;
  isStatic?: boolean;
  title?: string;
  subtitle?: string;
  message?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

export const ModalDestructive: FC<ModalDestructiveProps> = ({ isOpen, isStatic = true, subtitle, title, message, onAccept, onCancel }) => {
  return (
    <Modal
      isStatic={isStatic}
      setIsModalOpen={() => { }}
      isModalOpen={isOpen}
      title={title}
      subtitle={subtitle}
      classNamePanel='max-w-md'
    >
      <div>
        <span className='text-md py-4 text-zinc-300'>{message}</span>
        <div className='mt-4 flex justify-end'>
          <Button variant='outline' className='mr-2 border-2 border-zinc-700' onClick={onCancel}>Cancelar</Button>
          <Button variant='destructive' onClick={onAccept}>Excluir</Button>
        </div>
      </div>
    </Modal>
  )
}
