export interface TrainerFields {
  firstName: string;
  lastName: string;
  timeZone: string;
  courseTypes: string[];
  avatar: string | null;
}
export interface TrainerProfileMutation {
  description: string;
  specialization: string;
  experience: string;
  courseTypes: string[];
  certificates: string;
  availableDays: string;
}
