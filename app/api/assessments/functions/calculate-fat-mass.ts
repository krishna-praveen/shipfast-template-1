export const calculateFatMass = (weight: number, bodyFatPercentage: number) => {
  return weight * (bodyFatPercentage / 100);
};
