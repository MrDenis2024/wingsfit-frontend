import { ITimezone } from "./globalTypes.ts";

export interface GlobalError {
  error: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  userName: string;
  role: string;
  firstName: string;
  lastName: string;
  token: string;
  gender: string;
  timeZone: ITimezone;
  phoneNumber: string;
  avatar: string | null;
  dateOfBirth: string;
}

export type IUser = Omit<UserProfile, "token">;

export interface UserMutation {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface UserInfoMutation {
  firstName: string;
  lastName: string;
  timeZone: ITimezone;
  dateOfBirth: string;
  gender: string;
  phoneNumber?: string;
}
