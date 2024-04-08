/* eslint-disable no-unused-vars */
import { createContext, useContext, ReactNode, useState } from "react";

import { FlowAssessments } from "@/types/flowAssessments.type";

type FlowAssessmentsPartial = Partial<FlowAssessments>
interface IFlowAssessmentsContextData {
  flowAssessments: FlowAssessmentsPartial;
  updateFlowAssessments: (data: FlowAssessmentsPartial) => void;
}

type IFlowAssessmentsContextProps = {
  children: ReactNode
}

export const FlowAssessmentsContext = createContext({} as IFlowAssessmentsContextData)

export function FlowAssessmentsProvider({ children }: IFlowAssessmentsContextProps) {
  const [flowAssessments, setFlowAssessments] = useState<FlowAssessmentsPartial | undefined>()

  const updateFlowAssessments = (data: FlowAssessmentsPartial) => {
    setFlowAssessments(data)
  }

  return (
    <FlowAssessmentsContext.Provider value={{ flowAssessments, updateFlowAssessments }}>
      {children}
    </FlowAssessmentsContext.Provider>
  )
}

export const useFlowAssessmentsContext = () => useContext(FlowAssessmentsContext)
