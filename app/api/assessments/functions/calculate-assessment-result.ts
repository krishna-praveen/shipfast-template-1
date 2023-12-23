import { AssessmentTypeEnum } from "@/libs/enums/assessment-type-enum";


import { calculateBMR } from "./calculate-bmr";
import { calculateBodyMetrics } from "./calculate-body-metrics";
import { calculateFatMass } from "./calculate-fat-mass";
import { calculateIdealBodyFat } from "./calculate-ideal-body-fat";
import { calculateIdealWeight } from "./calculate-ideal-weight";
import { calculateLeanMass } from "./calculate-lean-mass";
import { calculateSumOfSkinfolds } from "./calculate-sum-of-skin-folds";
import {
  FEMALE_3_COEFFICIENTS,
  FEMALE_7_COEFFICIENTS,
  MALE_3_COEFFICIENTS,
  MALE_7_COEFFICIENTS,
} from "../constants";

const calculateAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const calculateAssessmentResult = (
  assessmentType: AssessmentTypeEnum,
  assessmentMeasures: any,
  bodyMeasurement: any,
  student: any
) => {
  let sumOfSkinfolds, metrics, bmr, fatMass, leanMass;

  // Supondo que você já tenha o objeto 'student' com as propriedades 'age' e 'gender'
  const { gender } = student;

  const age = calculateAge(student.birth_date);

  if (assessmentType === "pollock_3") {
    if (gender === "male") {
      const requiredProps = ["chest", "abdomen", "thigh"];
      sumOfSkinfolds = calculateSumOfSkinfolds(
        assessmentMeasures,
        requiredProps
      );
      metrics = calculateBodyMetrics(sumOfSkinfolds, age, MALE_3_COEFFICIENTS);
    } else {
      // FEMALE
      console.log({
        assessmentType,
        assessmentMeasures,
        bodyMeasurement,
        student,
        age,
      });
      const requiredProps = ["triceps", "suprailiac", "thigh"];
      sumOfSkinfolds = calculateSumOfSkinfolds(
        assessmentMeasures,
        requiredProps
      );
      metrics = calculateBodyMetrics(
        sumOfSkinfolds,
        age,
        FEMALE_3_COEFFICIENTS
      );
    }
  } else if (assessmentType === "pollock_7") {
    if (gender === "male") {
      const requiredProps = [
        "chest",
        "abdomen",
        "thigh",
        "subscapular",
        "axilla",
        "calf",
        "triceps",
      ];
      sumOfSkinfolds = calculateSumOfSkinfolds(
        assessmentMeasures,
        requiredProps
      );
      metrics = calculateBodyMetrics(sumOfSkinfolds, age, MALE_7_COEFFICIENTS);
    } else {
      // FEMALE
      const requiredProps = [
        "triceps",
        "suprailiac",
        "thigh",
        "subscapular",
        "axilla",
        "calf",
        "abdomen",
      ];
      sumOfSkinfolds = calculateSumOfSkinfolds(
        assessmentMeasures,
        requiredProps
      );
      metrics = calculateBodyMetrics(
        sumOfSkinfolds,
        age,
        FEMALE_7_COEFFICIENTS
      );
    }
  } else {
    throw new Error("Invalid assessment type");
  }

  bmr = calculateBMR(
    gender,
    assessmentMeasures.weight,
    assessmentMeasures.height,
    age
  );
  fatMass = calculateFatMass(
    assessmentMeasures.weight,
    metrics.bodyFatPercentage
  );
  leanMass = calculateLeanMass(assessmentMeasures.weight, fatMass);

  const idealBodyFat = calculateIdealBodyFat(gender);
  const idealWeight = calculateIdealWeight(leanMass, idealBodyFat);

  return {
    bodyDensity: metrics.bodyDensity,
    bodyFatPercentage: metrics.bodyFatPercentage,
    sumOfSkinfolds: sumOfSkinfolds,
    bmr,
    fatMass,
    leanMass,
    idealBodyFatMin: idealBodyFat.min,
    idealBodyFatMax: idealBodyFat.max,
    idealWeightMin: idealWeight.min,
    idealWeightMax: idealWeight.max,
  };
};
