export interface PatientDetails {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | '';
  dob: string;
  assessmentDate: string;
  caseId: string;
  clinicianName: string;
}

export type ScaleCategory = 'psychiatric' | 'intelligence' | 'personality' | 'projective';

export interface ScaleDefinition {
  id: string;
  name: string;
  fullName: string;
  category: ScaleCategory;
  shortDesc: string;
  timeEstimate: string;
  administeredBy: 'Patient' | 'Clinician' | 'Both';
}
