import { ITimezone } from "./globalTypes.ts";
import { IUser } from "./userTypes.ts";

export interface ClientProfileMutation {
  preferredWorkoutType: string[];
  trainingLevel: string;
  physicalData: string;
}
export interface FullClientProfileMutation extends ClientProfileMutation {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  timeZone: ITimezone;
}

export interface IClient {
  _id: string;
  user: IUser;
  subscribes: string[];
  preferredWorkoutType: string[];
  trainingLevel: string;
  physicalData: string;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  clients: IClient[];
}
