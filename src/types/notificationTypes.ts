import { IGroup } from "./groupTypes.ts";
import { ICourse } from "./courseTypes.ts";

export interface CourseToday {
  course: ICourse;
  group: IGroup;
}

export interface EndedSubscription {
  message: string;
  courseId: string;
}
