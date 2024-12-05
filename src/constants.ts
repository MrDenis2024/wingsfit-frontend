import { CourseTypeFields } from "./types/courseTypes.ts";

export const apiURL = import.meta.env.VITE_API_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const findCourseTypes = (
  courseTypes: CourseTypeFields[],
  ...courseTypesId: string[]
): CourseTypeFields[] => {
  return courseTypes.filter((type) => courseTypesId.includes(type._id));
};
