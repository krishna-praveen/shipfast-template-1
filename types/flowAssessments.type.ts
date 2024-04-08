import { Student } from '@/types/models/base/Student';

export type FlowAssessments = {
  startDate: string;
  studentInfo: Student;
  endDate: string;
  assessmentType: string;
  assessmentMeasures: {
    calf?: number;
    chest?: number;
    thigh?: number;
    axilla?: number;
    height?: number;
    weight?: number;
    abdomen?: number;
    triceps?: number;
    suprailiac?: number;
    subscapular?: number;
  };
  bodyMeasurement: {
    hip: number;
    left: {
      arm?: number;
      calf?: number;
      thigh?: number;
      forearm?: number;
    };
    neck: number;
    chest: number;
    right: {
      arm?: number;
      calf?: number;
      thigh?: number;
      forearm?: number;
    };
    waist: number;
    abdomen: number;
    shoulder: number;
  };
  imagesFiles: {
    front: Blob | File;
    back: Blob | File;
    left: Blob | File;
    right: Blob | File;
  }
};
