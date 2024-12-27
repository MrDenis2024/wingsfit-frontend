export interface CourseMutation {
  title: string;
  courseType: string;
  description: string;
  format: string;
  schedule: string[];
  price: string;
  image: string | null;
}

export interface CourseTypeFields {
  _id: string;
  name: string;
  description: string | null;
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
