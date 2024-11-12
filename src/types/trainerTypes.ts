import {IUser} from "./userTypes.ts";

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
  availableDays: string;
}

export interface ITrainer {
  _id: string;
  user: IUser;
  timeZone: string;
  courseTypes: string[];
  specialization: string;
  experience: string;
  certificates: string;
  description: string;
  availableDays: string;
  rating: number;
}