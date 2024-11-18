import { IUser } from "./userTypes.ts";

export interface ClientProfileMutation {
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}
export interface FullClientProfileMutation extends ClientProfileMutation {
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

export interface IClient {
  _id: string;
  user: IUser;
  subscribes: [];
  preferredWorkoutType: string;
  trainingLevel: string;
  physicalData: string;
}
