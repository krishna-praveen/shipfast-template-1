export const calculateSumOfSkinfolds = (
  properties: any,
  requiredProps: string[]
): number => {
  return requiredProps.reduce((sum, prop) => {
    return sum + properties[prop];
  }, 0);
};
