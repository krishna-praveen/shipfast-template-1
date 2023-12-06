export const calculateIdealBodyFat = (gender: string) => {
  if (gender === "male") {
    return { min: 8, max: 20 };
  } else {
    return { min: 15, max: 30 };
  }
};
