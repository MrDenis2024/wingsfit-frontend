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
