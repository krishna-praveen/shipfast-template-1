export const calculateBodyMetrics = (
  sumOfSkinfolds: number,
  age: number,
  coefficients: { a: number; b: number; c: number; d?: number }
) => {
  let bodyDensity;

  if (coefficients.d !== undefined) {
    bodyDensity =
      coefficients.a -
      coefficients.b * sumOfSkinfolds +
      coefficients.c * Math.pow(sumOfSkinfolds, 2) -
      coefficients.d * age;
  } else {
    bodyDensity =
      coefficients.a - coefficients.b * sumOfSkinfolds + coefficients.c * age;
  }

  const bodyFatPercentage = (4.95 / bodyDensity - 4.5) * 100;

  return {
    bodyDensity: Number(bodyDensity.toFixed(2)),
    bodyFatPercentage: Number(bodyFatPercentage.toFixed(2)),
  };
};
