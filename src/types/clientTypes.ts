import { IUser } from "./userTypes.ts";

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

export interface IClient {
  _id: string;
  user: IUser;
  subscribes: [];
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}

export interface IClientProfile {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    timeZone: {
      value: string;
      offset: string;
    };
  };
  subscribes: string[];
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}
