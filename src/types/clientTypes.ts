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

export interface Client extends ClientProfileMutation {
  _id: string;
  user: {
    _id: string;
    role: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    lastActivity: string;
  };
  subscribes: string;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  clients: Client[];
}
