import { GenderEnum } from "@/libs/enums";

export const calculateBMR = (
  gender: GenderEnum,
  weight: number,
  height: number,
  age: number
) => {
  if (gender === GenderEnum.MALE) {
    return 66 + 13.7 * weight + 5 * height - 6.8 * age;
  } else {
    return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }
};
