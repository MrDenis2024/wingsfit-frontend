import { ITimezone } from "./globalTypes.ts";
import { IUser } from "./userTypes.ts";

export interface Lesson {
  _id: string;
  course: {
    _id: string;
    title: string;
    participants: IUser[];
    user: {
      firstName: string;
      lastName: string;
    };
    courseType: {
      name: string;
    };
  };
  title: string;
  timeZone: ITimezone;
  groupLevel: number;
  quantityClients: number;
  ageLimit: number;
  description: string;
  participants: IUser[];
  presentUser: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  userId?: string[];
}

export interface LessonMutation {
  course: string;
  title: string;
  timeZone: ITimezone;
  groupLevel: string;
  quantityClients: string;
  ageLimit: string;
  description: string;
  participants: IUser[];
  presentUser: string[];
}
