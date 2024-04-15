import React, { FC } from 'react'

import { twMerge } from 'tailwind-merge';

import { useFlowAssessmentsContext } from '@/contexts/FlowAssessments.context';
import { useFlowAssessments } from '@/hooks/useFlowAssessments/useFlowAssessments';

interface StepperAssessmentsProps extends React.HTMLAttributes<HTMLDivElement> {
  pathname: string;
  assessmentType: string;
}

export const StepperAssessments: FC<StepperAssessmentsProps> = ({ pathname, assessmentType, className, ...props }) => {
  const flow = useFlowAssessments.getValidFlow({ page: pathname, key: assessmentType });

  return (
    <div className={twMerge('flex', className)} {...props}>
      {
        flow?.pages?.length > 0 && flow?.pages?.map((page, index) => {
          const currentIndexPage = flow?.pages?.findIndex(flowPage => flowPage === pathname)
          return (
            <div key={page} className={twMerge('rounded-full size-3 mr-2 border-2', currentIndexPage > index && 'border-pink-500', currentIndexPage === index && 'border-pink-500 bg-pink-500 cursor-pointer')} />
          )
        })
      }
    </div>
  )
}
