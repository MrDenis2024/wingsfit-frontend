export interface CourseMutation {
  title: string;
  courseType: string;
  description: string;
  format: string;
  schedule: string[];
  price: string;
  image: string | null;
}

export interface ICourseType {
  _id: string;
  name: string;
  isPublished: boolean;
  isBlocked: boolean;
}

export interface CourseTypeFields {
  name: string;
}

export interface ICourse {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    description: string | null;
  };
  title: string;
  courseType: {
    _id: string;
    name: string;
  };
  description: string;
  format: string;
  schedule: string[];
  price: number;
  image: string | null;
}

export interface UpdateCourseArg {
  id: string;
  course: CourseMutation;
}

export interface FetchSearchCourseArgs {
  courseTypes: string[];
  trainers: string[];
  format: string[];
  schedule: string[];
}
