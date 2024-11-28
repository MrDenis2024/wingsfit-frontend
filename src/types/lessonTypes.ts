import { ITimezone } from "./globalTypes.ts";

export interface Lesson {
  _id: string;
  course: string;
  title: string;
  timeZone: ITimezone;
  groupLevel: number;
  quantityClients: number;
  ageLimit: number;
  description: string;
  participants: string[];
  presentUser: string[];
}

export interface LessonMutation {
  course: string;
  title: string;
  timeZone: ITimezone;
  groupLevel: string;
  quantityClients: string;
  ageLimit: string;
  description: string;
  participants: string[];
  presentUser: string[];
}
