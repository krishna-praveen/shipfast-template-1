export const calculateIdealWeight = (
  leanMass: number,
  idealBodyFat: { min: number; max: number }
) => {
  const minWeight = leanMass / (1 - idealBodyFat.min / 100);
  const maxWeight = leanMass / (1 - idealBodyFat.max / 100);
  return { min: minWeight, max: maxWeight };
};
