import { ICourseType } from "./types/courseTypes.ts";

export const apiURL = import.meta.env.VITE_API_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const wsApiURL = import.meta.env.VITE_API_WS_URL;
export const DAYS_OF_WEEK = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const findCourseTypes = (
  courseTypes: ICourseType[],
  ...courseTypesId: string[]
): ICourseType[] => {
  return courseTypes.filter((type) => courseTypesId.includes(type._id));
};
