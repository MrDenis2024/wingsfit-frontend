import {CourseTypeFields} from "./types/courseTypes.ts";

export const apiURL = "http://localhost:8000";
export const GOOGLE_CLIENT_ID =
  "57092168870-ksmqhnpqpcr1srl6cc9svat8apaavo1b.apps.googleusercontent.com";

export const findCourseTypes = (courseTypes: CourseTypeFields[], ...courseTypesId: string[]): CourseTypeFields[] => {
  return courseTypes.filter(type => courseTypesId.includes(type._id));
};
