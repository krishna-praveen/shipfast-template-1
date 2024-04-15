import { FLOWS } from '../flows';

interface GetValidFlowProps {
  key: string;
  page: string;
  initialFlow?: boolean;
}

export const getValidFlow = ({ key, page, initialFlow }: GetValidFlowProps) => {
  const flow = FLOWS.filter(flow => flow.type === key)[0];

  const currentIndexPage = flow?.pages?.findIndex(flowPage => flowPage === page);
  const nextPage = currentIndexPage !== -1 && flow?.pages[currentIndexPage + 1];

  return {
    ...flow,
    hasNextPage: !!nextPage,
    nextPage: initialFlow ? flow?.pages[0] : nextPage,
  }
}
