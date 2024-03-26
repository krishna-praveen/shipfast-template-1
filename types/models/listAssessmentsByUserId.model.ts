export type AssessmentMeasures = {
  chest: number;
  thigh: number;
  height: number;
  weight: number;
  abdomen: number;
}

export type BodySideMeasurements = {
  arm: number;
  calf: number;
  thigh: number;
  forearm: number;
}

export type BodyMeasurement = {
  hip: number;
  left: BodySideMeasurements;
  neck: number;
  chest: number;
  right: BodySideMeasurements;
  waist: number;
  abdomen: number;
  shoulder: number;
}

export type AssessmentResult = {
  bmr: number;
  fatMass: number;
  leanMass: number;
  bodyDensity: number;
  idealWeightMax: number;
  idealWeightMin: number;
  sumOfSkinfolds: number;
  idealBodyFatMax: number;
  idealBodyFatMin: number;
  bodyFatPercentage: number;
}

export type Assessment = {
  id: string;
  startDate: Date;
  endDate: Date;
  studentId: string;
  assessmentType: "pollock_3" | "pollock_7";
  assessmentMeasures: AssessmentMeasures;
  bodyMeasurement: BodyMeasurement;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  assessmentResult: AssessmentResult;
}

export type IListAssessmentsByUserIdResponse = Assessment[];

export type IListAssessmentsByUserIdPayload = {
  studentId: string;
}
