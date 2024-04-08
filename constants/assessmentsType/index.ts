import { FLOWS } from '@/hooks/useFlowAssessments/flows'


export const ASSESSMENT_TYPE = FLOWS.map(flow => {
  return {
    value: flow.type,
    label: flow.name
  }
})
