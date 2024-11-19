export interface TrainerProfileMutation {
  description: string;
  specialization: string;
  experience: string;
  courseTypes: string[];
  availableDays: string;
}

export interface FullTrainerProfileMutation extends TrainerProfileMutation {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  timeZone: {
    value: string;
    label: string;
  };
}

export interface ITrainerProfile {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: string;
    gender: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    avatar: string | null;
    token: string;
    dateOfBirth: string;
    timeZone: {
      value: string;
      label: string;
    };
  };
  courseTypes: string[];
  specialization?: string;
  experience?: string;
  certificates?: string;
  description?: string;
  availableDays?: string;
  rating: number;
}

export interface ITrainer {
  _id: string;
  user: {
    _id: string;
    email: string;
    gender: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    avatar: string | null;
    dateOfBirth: string;
    timeZone: {
      value: string;
      label: string;
    };
  };
  courseTypes: string[];
  specialization?: string;
  experience?: string;
  certificates?: string;
  description?: string;
  availableDays?: string;
  rating: number;
}
