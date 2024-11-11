export interface ClientFields {
  firstName: string;
  lastName: string;
  timeZone: string;
  avatar: string | null;
}

export interface ClientProfileMutation {
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}
