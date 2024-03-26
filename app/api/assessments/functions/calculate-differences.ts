type NestedMeasurements = { [key: string]: number };

type Assessment = {
  assessmentMeasures: { [key: string]: number };
  assessmentResult: { [key: string]: number };
  bodyMeasurement: {
    [key: string]: number | NestedMeasurements;
  };
};

export const calculateDifferences = (
  firstAssessment: Assessment,
  lastAssessment: Assessment
) => {
  const measuresDifference: { [key: string]: number } = {};
  const resultDifference: { [key: string]: number } = {};
  const bodyMeasurementDifference: {
    [key: string]: number | NestedMeasurements;
  } = {};

  for (const key in firstAssessment.assessmentMeasures) {
    measuresDifference[key] =
      lastAssessment.assessmentMeasures[key] -
      firstAssessment.assessmentMeasures[key];
  }

  for (const key in firstAssessment.assessmentResult) {
    resultDifference[key] =
      lastAssessment.assessmentResult[key] -
      firstAssessment.assessmentResult[key];
  }

  for (const key in firstAssessment.bodyMeasurement) {
    const firstValue = firstAssessment.bodyMeasurement[key];
    const lastValue = lastAssessment.bodyMeasurement[key];

    if (
      typeof firstValue === "object" &&
      firstValue !== null &&
      typeof lastValue === "object" &&
      lastValue !== null
    ) {
      bodyMeasurementDifference[key] = {};
      for (const nestedKey in firstValue as NestedMeasurements) {
        (bodyMeasurementDifference[key] as NestedMeasurements)[nestedKey] =
          (lastValue as NestedMeasurements)[nestedKey] -
          (firstValue as NestedMeasurements)[nestedKey];
      }
    } else if (
      typeof firstValue === "number" &&
      typeof lastValue === "number"
    ) {
      bodyMeasurementDifference[key] = lastValue - firstValue;
    }
  }

  return { measuresDifference, resultDifference, bodyMeasurementDifference };
};
