
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

export interface ITrainer {
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
    dateOfBirth: string;
    timeZone: {
      value: string;
      label: string;
    };
  };
  courseTypes: string[];
  specialization?: string;
  experience?: string;
  certificates?: {
    _id: string;
    title: string;
    image: string;
  }[];
  description?: string;
  availableDays?: string;
  rating: number;
}

export interface Review {
  _id: string;
  clientId: {
    _id: string;
    firstName: string;
  };
  trainerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
