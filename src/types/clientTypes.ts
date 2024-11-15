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

export interface Client extends ClientProfileMutation {
  _id: string;
  user: {
    _id: string,
    role: string,
    firstName: string,
    lastName: string,
    createdAt: string,
    updatedAt: string,
    lastActivity: string;
  };
  subscribes: string;
}

export interface ClientStats {
  totalClients: number,
  activeClients: number,
  clients: Client[],
}

